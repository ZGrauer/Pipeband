#!/usr/bin/env node

/**
 * Writes a copy of dist/pipeband/index.html for each public page (dist/pipeband/hire/index.html
 * and so on) with that page's title, description, canonical URL and Open Graph / Twitter tags.
 *
 * Link previews (Facebook, iMessage, Slack) and some crawlers don't run JavaScript, so without
 * these every shared link shows the home page's title. The app itself boots the same as before.
 * Titles and descriptions come from src/app/page-meta.json, which the routing modules also use.
 *
 * CloudFront serves /hire from hire/index.html through cloudfront/rewrite-page-paths.js.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.kcpipeband.org';
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist', 'pipeband');
const pages = require(path.join(root, 'src', 'app', 'page-meta.json'));

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Replaces exactly one match, so a later index.html edit can't silently break the previews
function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, 'g')) || [];
  if (matches.length !== 1) {
    throw new Error(`Expected one ${label} in index.html, found ${matches.length}`);
  }
  return html.replace(pattern, replacement);
}

function metaTag(attribute, name) {
  return new RegExp(`<meta ${attribute}="${name}" content="[^"]*"\\s*/?>`);
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

for (const page of Object.values(pages)) {
  if (!page.path) {
    continue; // The root index.html is also the fallback for members pages and unknown URLs
  }
  const url = `${SITE_URL}/${page.path}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);

  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>');
  html = replaceOnce(html, metaTag('name', 'description'), `<meta name="description" content="${description}">`, 'description');
  html = replaceOnce(html, metaTag('property', 'og:title'), `<meta property="og:title" content="${title}"/>`, 'og:title');
  html = replaceOnce(html, metaTag('property', 'og:description'), `<meta property="og:description" content="${description}"/>`, 'og:description');
  html = replaceOnce(html, metaTag('property', 'og:url'), `<meta property="og:url" content="${url}"/>`, 'og:url');
  html = replaceOnce(html, metaTag('name', 'twitter:title'), `<meta name="twitter:title" content="${title}"/>`, 'twitter:title');
  html = replaceOnce(html, metaTag('name', 'twitter:description'), `<meta name="twitter:description" content="${description}"/>`, 'twitter:description');
  html = replaceOnce(html, /<base href="\/">/, `<link rel="canonical" href="${url}">\n  <base href="/">`, '<base href="/">');

  fs.mkdirSync(path.join(dist, page.path), { recursive: true });
  fs.writeFileSync(path.join(dist, page.path, 'index.html'), html);
}

console.log(`Wrote page shells for: ${Object.values(pages).filter(page => page.path).map(page => '/' + page.path).join(', ')}`);
