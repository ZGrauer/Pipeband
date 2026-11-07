#!/usr/bin/env node

/**
 * `npm start`: runs the members login Lambda (aws/member-login/index.mjs) on port 4310, then
 * starts `ng serve`, which proxies /api to it (proxy.conf.json). Extra arguments go to ng serve,
 * e.g. `npm start -- --port 4300`.
 *
 * The password is checked against the MEMBER_PASSWORD_HASH environment variable or the git-ignored
 * .member-password-hash (node scripts/generate-member-password-hash.js). The cookies are signed with a throwaway key;
 * ng serve doesn't check them, so member files open locally either way.
 */

const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

const root = path.join(__dirname, '..');
const API_PORT = 4310;
const hashFile = path.join(root, '.member-password-hash');

async function main() {
  const hash = (process.env.MEMBER_PASSWORD_HASH ||
    (fs.existsSync(hashFile) ? fs.readFileSync(hashFile, 'utf8') : '')).trim();
  if (!hash.startsWith('scrypt$')) {
    console.warn('WARNING: no members password hash found (an old bcrypt one no longer works),');
    console.warn('         so the members login will reject every password.');
    console.warn('         Run: node scripts/generate-member-password-hash.js');
  }

  const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
  process.env.MEMBER_PASSWORD_HASH = hash;
  process.env.CLOUDFRONT_KEY_PAIR_ID = 'LOCAL-DEV';
  process.env.CLOUDFRONT_PRIVATE_KEY_BASE64 = Buffer.from(privateKey.export({ type: 'pkcs8', format: 'pem' })).toString('base64');

  const { handler } = await import(pathToFileURL(path.join(root, 'aws', 'member-login', 'index.mjs')).href);

  // Turns a local request into the event a Lambda Function URL sends, and the reply back
  const api = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      const reply = await handler({
        rawPath: req.url.split('?')[0],
        requestContext: { http: { method: req.method } },
        body: Buffer.concat(chunks).toString('utf8'),
        isBase64Encoded: false
      });
      res.writeHead(reply.statusCode, { ...reply.headers, 'Set-Cookie': reply.cookies || [] });
      res.end(reply.body);
    });
  });

  api.listen(API_PORT, '127.0.0.1', () => {
    console.log(`Members login API on http://127.0.0.1:${API_PORT} (proxied at /api)`);
    const ng = spawn(process.execPath, [
      require.resolve('@angular/cli/bin/ng.js'), 'serve', '--proxy-config', 'proxy.conf.json', ...process.argv.slice(2)
    ], { cwd: root, stdio: 'inherit' });
    ng.on('exit', code => {
      api.close();
      process.exit(code ?? 0);
    });
  });
}

main();
