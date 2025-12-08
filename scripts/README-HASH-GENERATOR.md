# Members Authentication Hash Generator

This utility helps you generate obfuscated hash parts for your production member password.

## How It Works

1. Takes your production password as input
2. Generates a SHA-256 hash
3. Splits the hash into 3 parts
4. Base64 encodes each part for obfuscation
5. Provides the code to paste into `auth.service.ts`

## Usage

### Method 1: Command Line (Recommended for CI/CD)

```bash
node scripts/generate-hash-parts.js "YourProductionPassword"
```

### Method 2: Interactive (More Secure)

```bash
node scripts/generate-hash-parts.js
# Then enter your password when prompted (input will be hidden)
```

### Method 3: Make it Executable (Mac/Linux)

```bash
chmod +x scripts/generate-hash-parts.js
./scripts/generate-hash-parts.js
```

## Example Output

```
================================================================================
HASH GENERATION COMPLETE
================================================================================

📋 Full SHA-256 Hash:
   f369c9c6031fee8bb5b6d093d54e711bbe34b41bbe18e365b332db3c296e3

🔐 Obfuscated Parts (Base64 encoded):
   Part 1: ZjM2OWM5YzYwMzFmZWU4YmI1
   Part 2: YjZkMDkzZDU0ZTcxMWJiZTM0
   Part 3: YjQxYmJlMThlNjM2NWIzMzJkYjNjMjk2ZTM=

✅ Verification:
   ✓ Parts successfully reconstruct to original hash

📝 Copy this code into your auth.service.ts:
────────────────────────────────────────────────────────────────────────────────

  private readonly p1 = atob('ZjM2OWM5YzYwMzFmZWU4YmI1');
  private readonly p2 = atob('YjZkMDkzZDU0ZTcxMWJiZTM0');
  private readonly p3 = atob('YjQxYmJlMThlNjM2NWIzMzJkYjNjMjk2ZTM=');
  
────────────────────────────────────────────────────────────────────────────────

⚠️  SECURITY REMINDERS:
   • Delete this output from your terminal history
   • Do NOT commit the password to version control
   • Keep this script output secure
   • Update the hash parts in auth.service.ts before building for production

================================================================================
```

## Step-by-Step Workflow for Production Builds

### 1. Generate the Hash Parts

```bash
node scripts/generate-hash-parts.js "YourProdPassword"
```

### 2. Update auth.service.ts

Open `src/app/auth.service.ts` and replace these lines:

```typescript
private readonly p1 = atob('ZjM2OWM5YzYwMzFmZWU4YmI1');
private readonly p2 = atob('YjZkMDkzZDU0ZTcxMWJiZTM0');
private readonly p3 = atob('YjQxYmJlMThlNjM2NWIzMzJkYjNjMjk2ZTM=');
```

With the output from step 1.

### 3. Build for Production

```bash
npm run build
```

### 4. Deploy to AWS

Upload the `dist/pipeband` folder to your S3 bucket.

## Security Notes

### What This Provides

✅ **Obfuscation** - Makes it harder to find the password hash in the JavaScript bundle
✅ **Rate Limiting** - Prevents brute force attempts (5 attempts, 15-minute lockout)
✅ **Session Management** - 24-hour session expiration
✅ **Better UX** - Clear error messages and lockout warnings

### What This Doesn't Provide

❌ **True Security** - Client-side authentication is inherently insecure
❌ **Protection from Determined Attackers** - Anyone with dev tools can bypass this
❌ **Audit Trail** - No logging of who accessed what

### Recommended For

- ✅ Non-sensitive member content
- ✅ Competition scores and public documents
- ✅ Keeping casual visitors out
- ✅ Providing access to band members without complex infrastructure

### NOT Recommended For

- ❌ Personal information
- ❌ Financial data
- ❌ HIPAA/GDPR protected content
- ❌ Anything requiring true security

## Changing Your Password

1. Generate new hash parts with the new password
2. Update `auth.service.ts` with the new parts
3. Rebuild and redeploy
4. All existing sessions will be invalidated (users need to log in again)

## Testing Locally

The default password `CHANGE_ME` is already configured in the code. You can test the login flow without generating new hash parts.

**Default Login:**
- Password: `CHANGE_ME`

## Troubleshooting

### "Login always fails even with correct password"

Check that you copied all 3 parts correctly from the generator output. The hash is split into 3 parts that must all be present.

### "Users are getting locked out too easily"

You can adjust the rate limiting in `login.component.ts`:

```typescript
maxAttempts = 5;           // Change this number
lockoutDuration = 15 * 60 * 1000; // Change to different duration
```

### "Sessions expire too quickly"

You can adjust the session duration in `auth.service.ts`:

```typescript
private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // Milliseconds
```

## Additional Security Considerations

1. **Use HTTPS** - Always serve your site over HTTPS
2. **Content Security Policy** - Add CSP headers in your nginx.conf
3. **Regular Password Changes** - Change the member password periodically
4. **Monitor Access Logs** - Check CloudFront logs for unusual activity
5. **Consider Lambda@Edge** - For true security, consider serverless authentication

## Support

For questions or issues, contact the band's webmaster.

