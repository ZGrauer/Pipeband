#!/usr/bin/env node

/**
 * npm run deploy: builds the site and publishes dist/pipeband to S3 and CloudFront.
 *
 *   npm run deploy                    build, check, dry run, ask, upload, invalidate the cache
 *   npm run deploy -- --dry-run       stop after showing what would change
 *   npm run deploy -- --skip-build    use the dist/pipeband already built
 *
 * Settings are in deploy.config.json. Needs the AWS CLI, signed in with `aws login`.
 *
 * Safety:
 * - Refuses to publish private files (the roster, .3mf files, Jim_Photos, keys, password hashes).
 * - Shows every file it would delete, and warns loudly before deleting photos, which aren't in git.
 * - Uploads in an order that never breaks the live site: files first, HTML last, deletions after.
 * - Keeps old JavaScript bundles for 30 days, so a visitor with an old page cached still works.
 * - Sets Cache-Control on everything it uploads (see CACHE below).
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const DIST = path.join(root, 'dist', 'pipeband');
const config = require(path.join(root, 'deploy.config.json'));
const flags = new Set(process.argv.slice(2));

const CACHE = {
  // Angular puts a content hash in these names, so a changed file always gets a new name
  bundles: 'public, max-age=31536000, immutable',
  // Browsers check for a new version every time; CloudFront keeps it until the deploy invalidates it
  html: 'public, max-age=0, s-maxage=86400, must-revalidate',
  members: 'private, max-age=3600',
  assets: 'public, max-age=86400'
};
const KEEP_OLD_BUNDLES_DAYS = 30;
const JUNK = ['--exclude', '*Thumbs.db', '--exclude', '*.DS_Store', '--exclude', '*desktop.ini'];

// Files that must never be published. Paths are relative to dist/pipeband, with forward slashes.
const FORBIDDEN = [
  [/Band_Roster/i, 'the band roster'],
  [/\.3mf$/i, '3D print project files'],
  [/^assets\/Jim_Photos\//, 'Jim_Photos'],
  [/\.(pem|key)$/i, 'a key file'],
  [/member-password-hash/i, 'the members password hash'],
  [/\.xlsx?$/i, 'a spreadsheet']
];
const PHOTO_PREFIXES = ['assets/photos/', 'assets/optimized/'];

function fail(message) {
  console.error(`\nDeploy stopped: ${message}`);
  process.exit(1);
}

function heading(text) {
  console.log(`\n== ${text}`);
}

function aws(args, { capture = false } = {}) {
  const extra = ['--region', config.region, ...(config.profile ? ['--profile', config.profile] : [])];
  // DEPLOY_AWS_CLI points at a stand-in Node script, for testing the deploy without touching AWS
  const [command, ...prefix] = process.env.DEPLOY_AWS_CLI ? [process.execPath, process.env.DEPLOY_AWS_CLI] : ['aws'];
  const result = spawnSync(command, [...prefix, ...args, ...extra], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: capture ? 'pipe' : 'inherit'
  });
  if (result.error && result.error.code === 'ENOENT') {
    fail('the AWS CLI isn\'t installed or isn\'t on PATH. Install it (winget install Amazon.AWSCLI), open a new terminal and run `aws login`.');
  }
  if (result.status !== 0) {
    fail(`this AWS command failed:\n  aws ${args.join(' ')}\n${capture ? (result.stderr || result.stdout) : ''}`);
  }
  return result.stdout || '';
}

// One reader for every question, so answers typed (or piped) ahead aren't lost; no answer means no
let input;
async function ask(question) {
  if (!input) {
    const rl = readline.createInterface({ input: process.stdin });
    input = { rl, lines: rl[Symbol.asyncIterator]() };
  }
  process.stdout.write(question);
  const { value, done } = await input.lines.next();
  if (!done && !process.stdin.isTTY) {
    console.log(); // A typed answer already ends the line; a piped one doesn't
  }
  return done ? '' : value.trim();
}

function git(args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : '';
}

function listFiles(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const relative = prefix + entry.name;
    return entry.isDirectory() ? listFiles(path.join(dir, entry.name), relative + '/') : [relative];
  });
}

function checkDist() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    fail('dist/pipeband/index.html is missing. Run the build first, or drop --skip-build.');
  }
  const files = listFiles(DIST);
  const problems = files.flatMap(file => {
    const match = FORBIDDEN.find(([pattern]) => pattern.test(file));
    return match ? [`${file} (${match[1]})`] : [];
  });
  if (problems.length) {
    fail(`the build contains private files that must not be published:\n  ${problems.join('\n  ')}\nCheck the "ignore" list for assets in angular.json.`);
  }
  for (const required of ['join/index.html', 'hire/index.html']) {
    if (!files.includes(required)) {
      fail(`${required} is missing, so the page shells weren't written. Build with \`npm run build\`, not \`ng build\`.`);
    }
  }
  if (!files.some(file => file.startsWith('assets/members/'))) {
    fail('there are no member files in assets/members/.');
  }
  for (const file of files.filter(f => /^main\..*\.js$/.test(f))) {
    const code = fs.readFileSync(path.join(DIST, file), 'utf8');
    if (code.includes('$2b$') || code.includes('scrypt$')) {
      fail(`${file} contains what looks like a password hash.`);
    }
  }
  return files;
}

// Old bundles still referenced by HTML a visitor may have cached; delete them only once they're old
function recentOldBundles(localFiles) {
  const local = new Set(localFiles);
  const listing = JSON.parse(aws(['s3api', 'list-objects-v2', '--bucket', config.bucket, '--delimiter', '/',
    '--query', 'Contents[].{key: Key, modified: LastModified}', '--output', 'json'], { capture: true }) || '[]') || [];
  const cutoff = Date.now() - KEEP_OLD_BUNDLES_DAYS * 24 * 60 * 60 * 1000;
  return listing
    .filter(object => /\.(js|css)$/.test(object.key) && !local.has(object.key) && Date.parse(object.modified) > cutoff)
    .map(object => object.key);
}

function parseDryRun(output) {
  const uploads = [];
  const deletes = [];
  for (const line of output.split(/\r?\n/)) {
    const upload = line.match(/^\(dryrun\) upload: .* to s3:\/\/[^/]+\/(.+)$/);
    const remove = line.match(/^\(dryrun\) delete: s3:\/\/[^/]+\/(.+)$/);
    if (upload) uploads.push(upload[1]);
    if (remove) deletes.push(remove[1]);
  }
  return { uploads, deletes };
}

async function main() {
  if (!config.bucket || !config.distributionId || !config.region) {
    fail('deploy.config.json needs bucket, distributionId and region.');
  }
  const target = `s3://${config.bucket}`;
  const membersTarget = config.membersBucket ? `s3://${config.membersBucket}/assets/members` : '';

  heading('Checking git');
  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  const dirty = git(['status', '--porcelain', '--untracked-files=no']);
  console.log(`Branch ${branch || '(unknown)'}${dirty ? ', with uncommitted changes' : ', clean'}`);
  if ((branch !== 'main' || dirty) && !flags.has('--dry-run')) {
    if ((await ask('You normally deploy from a clean main. Continue anyway? (y/N) ')).toLowerCase() !== 'y') {
      fail('cancelled.');
    }
  }

  heading('Checking AWS');
  const identity = aws(['sts', 'get-caller-identity', '--query', 'Arn', '--output', 'text'], { capture: true }).trim();
  console.log(`Signed in as ${identity}`);
  const versioning = aws(['s3api', 'get-bucket-versioning', '--bucket', config.bucket, '--query', 'Status', '--output', 'text'], { capture: true }).trim();
  if (versioning !== 'Enabled') {
    console.warn(`WARNING: versioning is off for ${config.bucket}, so anything this deploy deletes or overwrites is gone for good.`);
    console.warn('         README, "S3 versioning", shows how to turn it on.');
  }

  if (!config.membersBucket) {
    console.warn(`WARNING: no membersBucket in deploy.config.json, so member files go to the public ${config.bucket} bucket,`);
    console.warn('         where anyone can read them from its S3 website address. README, "Member login (AWS)", step 4.');
  }

  if (!flags.has('--skip-build')) {
    heading('Building');
    const build = spawnSync('npm run build', { cwd: root, stdio: 'inherit', shell: true });
    if (build.status !== 0) {
      fail('the build failed.');
    }
  }

  heading('Checking the build');
  const files = checkDist();
  console.log(`${files.length} files, no private files found`);

  const keep = recentOldBundles(files);
  const keepArgs = keep.flatMap(key => ['--exclude', key]);
  const membersArgs = config.membersBucket ? ['--exclude', 'assets/members/*'] : [];
  const deleteSync = ['s3', 'sync', DIST, target, '--delete', ...membersArgs, ...keepArgs, ...JUNK];
  const membersSync = config.membersBucket
    ? ['s3', 'sync', path.join(DIST, 'assets', 'members'), membersTarget, '--delete', '--cache-control', CACHE.members, ...JUNK]
    : null;

  heading('Dry run');
  const plan = parseDryRun(aws([...deleteSync, '--dryrun'], { capture: true }));
  const membersPlan = membersSync ? parseDryRun(aws([...membersSync, '--dryrun'], { capture: true })) : { uploads: [], deletes: [] };
  const photoDeletes = plan.deletes.filter(key => PHOTO_PREFIXES.some(prefix => key.startsWith(prefix)));

  console.log(`${plan.uploads.length + membersPlan.uploads.length} files to upload`);
  console.log(`${keep.length} old bundles kept for now (deleted once they're over ${KEEP_OLD_BUNDLES_DAYS} days old)`);
  const allDeletes = [...plan.deletes.map(key => `${config.bucket}/${key}`), ...membersPlan.deletes.map(key => `${config.membersBucket}/${key}`)];
  console.log(`${allDeletes.length} files to delete${allDeletes.length ? ':' : ''}`);
  allDeletes.forEach(key => console.log(`  - ${key}`));
  if (photoDeletes.length) {
    console.warn(`\nWARNING: ${photoDeletes.length} of those are photos. Photos aren't in git, so if this computer is missing them,`);
    console.warn('         the copy in S3 may be the only one. Copy them into src/assets first unless you meant to remove them.');
  }

  if (flags.has('--dry-run')) {
    console.log('\nDry run only; nothing was changed.');
    return;
  }
  if (!plan.uploads.length && !plan.deletes.length && !membersPlan.uploads.length && !membersPlan.deletes.length) {
    console.log('\nNothing has changed since the last deploy.');
    return;
  }

  const answer = await ask(`\nType "deploy" to publish${photoDeletes.length ? ' AND delete those photos' : ''}: `);
  if (answer !== 'deploy') {
    fail('cancelled. Nothing was changed.');
  }

  heading('Uploading');
  const sync = ['s3', 'sync', DIST, target, ...membersArgs];
  // Images, documents and other files that keep their names
  aws([...sync, '--exclude', '*.html', '--exclude', 'assets/members/*', '--exclude', '*.js', '--exclude', '*.css',
    '--include', '*/*.js', '--include', '*/*.css', '--exclude', 'assets/members/*', ...JUNK, '--cache-control', CACHE.assets]);
  // Member files
  if (membersSync) {
    aws(membersSync);
  } else {
    aws([...sync, '--exclude', '*', '--include', 'assets/members/*', ...JUNK, '--cache-control', CACHE.members]);
  }
  // Hashed JavaScript and CSS, before the HTML that points to them
  aws([...sync, '--exclude', '*', '--include', '*.js', '--include', '*.css', '--exclude', '*/*', '--cache-control', CACHE.bundles]);
  // HTML last, so the live pages switch over only when everything they need is there
  aws([...sync, '--exclude', '*', '--include', '*.html', '--cache-control', CACHE.html]);

  heading('Removing deleted files');
  aws(deleteSync);

  heading('Clearing the CloudFront cache');
  const invalidation = aws(['cloudfront', 'create-invalidation', '--distribution-id', config.distributionId,
    '--paths', '/*', '--query', 'Invalidation.Id', '--output', 'text'], { capture: true }).trim();
  console.log(`Invalidation ${invalidation} started; it usually finishes within a few minutes.`);

  console.log('\nDeployed. Once the invalidation finishes, check in a private window:');
  console.log('  https://www.kcpipeband.org/          the home page loads');
  console.log('  https://www.kcpipeband.org/login     log in and open a score');
  console.log('  https://www.kcpipeband.org/join      the new pages work');
}

main().finally(() => input?.rl.close());
