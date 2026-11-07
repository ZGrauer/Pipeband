#!/usr/bin/env node

/**
 * Generates the members password hash for the login Lambda (aws/member-login/index.mjs).
 *
 * Usage:
 *   node scripts/generate-member-password-hash.js
 *   node scripts/generate-member-password-hash.js "ThePassword"
 *
 * Prints the value for the Lambda's MEMBER_PASSWORD_HASH setting and saves it to the
 * git-ignored .member-password-hash, which `npm start` uses for local development.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const HASH_FILE = path.join(__dirname, '..', '.member-password-hash');

// Must match what passwordMatches() in aws/member-login/index.mjs reads
const N = 16384;
const R = 8;
const P = 1;

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 32, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${hash.toString('base64')}`;
}

// Reads a line without echoing it to the terminal
function askHidden(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.stdoutMuted = false;
    rl._writeToOutput = text => {
      if (!rl.stdoutMuted || text.includes('\n')) {
        rl.output.write(rl.stdoutMuted ? '\n' : text);
      }
    };
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
    rl.stdoutMuted = true;
  });
}

async function main() {
  const password = process.argv[2] || await askHidden('Members password: ');
  if (!password) {
    console.error('No password given.');
    process.exit(1);
  }
  if (!process.argv[2] && await askHidden('Type it again: ') !== password) {
    console.error('The passwords did not match.');
    process.exit(1);
  }

  const hash = hashPassword(password);
  fs.writeFileSync(HASH_FILE, hash + '\n');

  console.log('\nSaved to .member-password-hash (git-ignored) for local development.');
  console.log('\nPaste this into the Lambda as MEMBER_PASSWORD_HASH:\n');
  console.log(hash);
}

main();
