#!/usr/bin/env node

/**
 * Hash Generator for Members Authentication
 * 
 * This script helps you generate the 3-part obfuscated hash
 * for your production password.
 * 
 * Usage:
 *   node scripts/generate-hash-parts.js "YourProductionPassword"
 * 
 * Or run interactively:
 *   node scripts/generate-hash-parts.js
 */

const crypto = require('crypto');
const readline = require('readline');

// Function to generate SHA-256 hash
function generateSHA256(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Function to split hash into 3 parts and encode them
function generateHashParts(password) {
  const fullHash = generateSHA256(password);
  
  // Split into 3 roughly equal parts
  const part1Length = Math.floor(fullHash.length / 3);
  const part2Length = Math.floor(fullHash.length / 3);
  
  const part1 = fullHash.substring(0, part1Length);
  const part2 = fullHash.substring(part1Length, part1Length + part2Length);
  const part3 = fullHash.substring(part1Length + part2Length);
  
  // Base64 encode each part
  const encoded1 = Buffer.from(part1).toString('base64');
  const encoded2 = Buffer.from(part2).toString('base64');
  const encoded3 = Buffer.from(part3).toString('base64');
  
  return {
    fullHash,
    parts: {
      part1: { raw: part1, encoded: encoded1 },
      part2: { raw: part2, encoded: encoded2 },
      part3: { raw: part3, encoded: encoded3 }
    }
  };
}

// Function to verify the parts reconstruct correctly
function verifyParts(parts) {
  const reconstructed = 
    Buffer.from(parts.part1.encoded, 'base64').toString() +
    Buffer.from(parts.part2.encoded, 'base64').toString() +
    Buffer.from(parts.part3.encoded, 'base64').toString();
  return reconstructed;
}

// Main function
function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Password provided as argument
    const password = args[0];
    generateAndDisplay(password);
  } else {
    // Interactive mode - hide password input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    console.log('\n=== Members Authentication Hash Generator ===\n');
    console.log('Enter your production password (input will be hidden):');
    
    // Hide input for password
    const stdin = process.stdin;
    stdin.on('data', function(char) {
      char = char + '';
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          stdin.pause();
          break;
        default:
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write('Password: ' + Array(rl.line.length + 1).join('*'));
          break;
      }
    });
    
    rl.question('Password: ', (password) => {
      console.log('\n');
      generateAndDisplay(password);
      rl.close();
    });
  }
}

function generateAndDisplay(password) {
  if (!password) {
    console.error('❌ Error: Password cannot be empty');
    process.exit(1);
  }
  
  const result = generateHashParts(password);
  
  console.log('='.repeat(80));
  console.log('HASH GENERATION COMPLETE');
  console.log('='.repeat(80));
  console.log('\n📋 Full SHA-256 Hash:');
  console.log(`   ${result.fullHash}`);
  
  console.log('\n🔐 Obfuscated Parts (Base64 encoded):');
  console.log(`   Part 1: ${result.parts.part1.encoded}`);
  console.log(`   Part 2: ${result.parts.part2.encoded}`);
  console.log(`   Part 3: ${result.parts.part3.encoded}`);
  
  console.log('\n✅ Verification:');
  const reconstructed = verifyParts(result.parts);
  if (reconstructed === result.fullHash) {
    console.log('   ✓ Parts successfully reconstruct to original hash');
  } else {
    console.log('   ✗ ERROR: Parts do not reconstruct correctly!');
  }
  
  console.log('\n📝 Copy this code into your auth.service.ts:');
  console.log('─'.repeat(80));
  console.log(`
  private readonly p1 = atob('${result.parts.part1.encoded}');
  private readonly p2 = atob('${result.parts.part2.encoded}');
  private readonly p3 = atob('${result.parts.part3.encoded}');
  `);
  console.log('─'.repeat(80));
  
  console.log('\n⚠️  SECURITY REMINDERS:');
  console.log('   • Delete this output from your terminal history');
  console.log('   • Do NOT commit the password to version control');
  console.log('   • Keep this script output secure');
  console.log('   • Update the hash parts in auth.service.ts before building for production');
  console.log('\n' + '='.repeat(80) + '\n');
}

// Run the script
main();

