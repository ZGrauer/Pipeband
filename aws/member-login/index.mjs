// Members login for kcpipeband.org: an AWS Lambda (Node.js 22.x) behind CloudFront at /api/*.
// Paste this file into the Lambda console as index.mjs; it has no dependencies.
//
// POST /api/login  {"password": "..."}  -> checks the password, then sets CloudFront signed
//                                          cookies that unlock /assets/members/* for SESSION_HOURS
// POST /api/logout                      -> expires those cookies
//
// Environment variables (see README, "Member login (AWS)"):
//   MEMBER_PASSWORD_HASH           from scripts/generate-member-password-hash.js
//   CLOUDFRONT_KEY_PAIR_ID         the CloudFront public key's ID
//   CLOUDFRONT_PRIVATE_KEY_BASE64  from scripts/generate-cloudfront-key.js
//   SESSION_HOURS                  optional, default 24

import { createSign, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

const PROTECTED_RESOURCE = 'https://*/assets/members/*';
const COOKIE_PATH = '/assets/members/';
const FAILED_LOGIN_DELAY_MS = 500;
const MAX_PASSWORD_LENGTH = 200;

export async function handler(event) {
  const method = event.requestContext?.http?.method;
  const path = event.rawPath || '';

  if (method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }
  if (path.endsWith('/logout')) {
    return json(200, { loggedOut: true }, expiredCookies());
  }
  if (!path.endsWith('/login')) {
    return json(404, { error: 'Not found' });
  }

  const password = readPassword(event);
  if (!password || !(await passwordMatches(password, process.env.MEMBER_PASSWORD_HASH))) {
    await new Promise(resolve => setTimeout(resolve, FAILED_LOGIN_DELAY_MS));
    return json(401, { error: 'Incorrect password' });
  }

  const hours = Number(process.env.SESSION_HOURS) || 24;
  const expiresAt = Date.now() + hours * 60 * 60 * 1000;
  return json(200, { expiresAt }, signedCookies(expiresAt));
}

function readPassword(event) {
  try {
    const body = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body;
    const password = JSON.parse(body || '{}').password;
    return typeof password === 'string' && password.length <= MAX_PASSWORD_LENGTH ? password : '';
  } catch {
    return '';
  }
}

// Hash format: scrypt$N$r$p$saltBase64$hashBase64
export async function passwordMatches(password, storedHash) {
  const [scheme, n, r, p, salt, hash] = (storedHash || '').trim().split('$');
  if (scheme !== 'scrypt' || !hash) {
    return false;
  }
  try {
    const expected = Buffer.from(hash, 'base64');
    const actual = await scryptAsync(password, Buffer.from(salt, 'base64'), expected.length, {
      N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024
    });
    return timingSafeEqual(actual, expected);
  } catch {
    return false; // A malformed MEMBER_PASSWORD_HASH refuses every login rather than failing open
  }
}

// CloudFront's URL-safe Base64: + becomes -, = becomes _, / becomes ~
function cloudFrontBase64(buffer) {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/=/g, '_').replace(/\//g, '~');
}

function signedCookies(expiresAt) {
  const policy = JSON.stringify({
    Statement: [{
      Resource: PROTECTED_RESOURCE,
      Condition: { DateLessThan: { 'AWS:EpochTime': Math.floor(expiresAt / 1000) } }
    }]
  });
  const privateKey = Buffer.from(process.env.CLOUDFRONT_PRIVATE_KEY_BASE64 || '', 'base64').toString('utf8');
  // CloudFront signed cookies require an RSA-SHA1 signature
  const signature = createSign('RSA-SHA1').update(policy).sign(privateKey);
  const maxAge = Math.floor((expiresAt - Date.now()) / 1000);

  return [
    cookie('CloudFront-Policy', cloudFrontBase64(Buffer.from(policy)), maxAge),
    cookie('CloudFront-Signature', cloudFrontBase64(signature), maxAge),
    cookie('CloudFront-Key-Pair-Id', process.env.CLOUDFRONT_KEY_PAIR_ID || '', maxAge)
  ];
}

function expiredCookies() {
  return ['CloudFront-Policy', 'CloudFront-Signature', 'CloudFront-Key-Pair-Id'].map(name => cookie(name, '', 0));
}

function cookie(name, value, maxAge) {
  return `${name}=${value}; Path=${COOKIE_PATH}; Max-Age=${maxAge}; Secure; HttpOnly; SameSite=Strict`;
}

function json(statusCode, body, cookies = []) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    cookies,
    body: JSON.stringify(body)
  };
}
