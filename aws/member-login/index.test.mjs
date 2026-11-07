// Run with: node --test aws/
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createVerify, generateKeyPairSync, randomBytes, scryptSync } from 'node:crypto';

import { handler, passwordMatches } from './index.mjs';

const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const PASSWORD = 'test-password-only';

function hashFor(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32, { N: 16384, r: 8, p: 1 });
  return `scrypt$16384$8$1$${salt.toString('base64')}$${hash.toString('base64')}`;
}

function request(path, body, method = 'POST') {
  return { rawPath: path, requestContext: { http: { method } }, body: JSON.stringify(body), isBase64Encoded: false };
}

function cookieValues(cookies) {
  return Object.fromEntries(cookies.map(cookie => {
    const [pair] = cookie.split(';');
    const index = pair.indexOf('=');
    return [pair.slice(0, index), pair.slice(index + 1)];
  }));
}

function fromCloudFrontBase64(value) {
  return Buffer.from(value.replace(/-/g, '+').replace(/_/g, '=').replace(/~/g, '/'), 'base64');
}

beforeEach(() => {
  process.env.MEMBER_PASSWORD_HASH = hashFor(PASSWORD);
  process.env.CLOUDFRONT_KEY_PAIR_ID = 'K2TESTKEYID';
  process.env.CLOUDFRONT_PRIVATE_KEY_BASE64 = Buffer.from(privateKey.export({ type: 'pkcs8', format: 'pem' })).toString('base64');
  delete process.env.SESSION_HOURS;
});

test('the right password gets signed cookies that CloudFront can verify', async () => {
  const before = Date.now();
  const response = await handler(request('/api/login', { password: PASSWORD }));
  assert.equal(response.statusCode, 200);

  const { expiresAt } = JSON.parse(response.body);
  assert.ok(Math.abs(expiresAt - (before + 24 * 60 * 60 * 1000)) < 5000);

  const values = cookieValues(response.cookies);
  assert.equal(values['CloudFront-Key-Pair-Id'], 'K2TESTKEYID');

  const policy = fromCloudFrontBase64(values['CloudFront-Policy']);
  const statement = JSON.parse(policy.toString()).Statement[0];
  assert.equal(statement.Resource, 'https://*/assets/members/*');
  assert.equal(statement.Condition.DateLessThan['AWS:EpochTime'], Math.floor(expiresAt / 1000));

  const signature = fromCloudFrontBase64(values['CloudFront-Signature']);
  assert.ok(createVerify('RSA-SHA1').update(policy).verify(publicKey, signature));

  for (const cookie of response.cookies) {
    assert.match(cookie, /; Path=\/assets\/members\/; Max-Age=\d+; Secure; HttpOnly; SameSite=Strict$/);
  }
});

test('SESSION_HOURS changes how long the session lasts', async () => {
  process.env.SESSION_HOURS = '2';
  const response = await handler(request('/api/login', { password: PASSWORD }));
  const { expiresAt } = JSON.parse(response.body);
  assert.ok(Math.abs(expiresAt - (Date.now() + 2 * 60 * 60 * 1000)) < 5000);
});

test('a base64-encoded body is accepted', async () => {
  const event = request('/api/login', {});
  event.body = Buffer.from(JSON.stringify({ password: PASSWORD })).toString('base64');
  event.isBase64Encoded = true;
  assert.equal((await handler(event)).statusCode, 200);
});

test('a wrong, missing or oversized password is refused without cookies', async () => {
  for (const body of [{ password: 'nope' }, {}, { password: 42 }, { password: 'x'.repeat(201) }]) {
    const response = await handler(request('/api/login', body));
    assert.equal(response.statusCode, 401);
    assert.deepEqual(response.cookies, []);
  }
});

test('a malformed body or missing hash is refused', async () => {
  const event = request('/api/login', {});
  event.body = 'not json';
  assert.equal((await handler(event)).statusCode, 401);

  delete process.env.MEMBER_PASSWORD_HASH;
  assert.equal((await handler(request('/api/login', { password: PASSWORD }))).statusCode, 401);
});

test('logout expires all three cookies', async () => {
  const response = await handler(request('/api/logout', {}));
  assert.equal(response.statusCode, 200);
  assert.equal(response.cookies.length, 3);
  for (const cookie of response.cookies) {
    assert.match(cookie, /^CloudFront-[A-Za-z-]+=; Path=\/assets\/members\/; Max-Age=0;/);
  }
});

test('only POST to /login and /logout is allowed', async () => {
  assert.equal((await handler(request('/api/login', {}, 'GET'))).statusCode, 405);
  assert.equal((await handler(request('/api/other', {}))).statusCode, 404);
});

test('passwordMatches rejects other hash formats', async () => {
  assert.equal(await passwordMatches(PASSWORD, '$2b$10$abcdefghijklmnopqrstuv'), false);
  assert.equal(await passwordMatches(PASSWORD, ''), false);
  assert.equal(await passwordMatches(PASSWORD, 'scrypt$1000$8$1$c2FsdA==$aGFzaA=='), false);
  assert.equal(await passwordMatches(PASSWORD, hashFor(PASSWORD)), true);
});
