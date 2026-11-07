#!/usr/bin/env node

/**
 * Generates the RSA key pair that signs the members' CloudFront cookies.
 *
 * Usage:
 *   node scripts/generate-cloudfront-key.js
 *
 * Writes cloudfront-keys/public_key.pem and cloudfront-keys/private_key.pem (git-ignored), then
 * prints the public key to add in CloudFront and the private key, Base64-encoded, for the
 * Lambda's CLOUDFRONT_PRIVATE_KEY_BASE64 setting. Keep the private key secret.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'cloudfront-keys');
const publicFile = path.join(dir, 'public_key.pem');
const privateFile = path.join(dir, 'private_key.pem');

if (fs.existsSync(privateFile) && process.argv[2] !== '--replace') {
  console.error('cloudfront-keys/private_key.pem already exists.');
  console.error('Run with --replace to make a new pair (the old one stops working once CloudFront uses the new key).');
  process.exit(1);
}

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(publicFile, publicKey);
fs.writeFileSync(privateFile, privateKey, { mode: 0o600 });

console.log('Saved cloudfront-keys/public_key.pem and private_key.pem (git-ignored).\n');
console.log('1. CloudFront > Public keys > Create public key, and paste this in:\n');
console.log(publicKey);
console.log('2. Lambda > Configuration > Environment variables > CLOUDFRONT_PRIVATE_KEY_BASE64:\n');
console.log(Buffer.from(privateKey).toString('base64'));
