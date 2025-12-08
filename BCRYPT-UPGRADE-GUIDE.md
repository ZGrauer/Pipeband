# Bcrypt Security Upgrade Guide

## 🔐 What Changed

Your authentication system has been **upgraded from SHA-256 to bcrypt** for significantly enhanced security.

### Before (SHA-256):
- Simple cryptographic hash function
- Fast to compute (vulnerability for brute-force attacks)
- No built-in salt
- Single pass hashing

### After (Bcrypt):
- **Password hashing algorithm designed for security**
- **Computationally expensive** (intentionally slow to prevent brute-force)
- **Built-in salt** (automatically embedded in hash)
- **Configurable cost factor** (10 rounds = 2^10 = 1,024 iterations)
- **Industry standard** for password storage

---

## 📊 Security Improvements

| Aspect | SHA-256 | Bcrypt (Current) | Improvement |
|--------|---------|------------------|-------------|
| **Brute Force Resistance** | Low | Very High | ⬆️ 1000x+ slower |
| **Rainbow Table Protection** | Manual salt needed | Automatic salt | ✅ Built-in |
| **Future-proof** | Fixed speed | Adjustable cost | ✅ Scalable |
| **Industry Standard** | Not for passwords | Yes | ✅ Recommended |
| **Hash Length** | 64 chars | 60 chars | Similar |
| **Computation Time** | ~microseconds | ~100ms | ✅ Intentional |

---

## 🚀 What You Need to Do

### Step 1: Install Dependencies (Already Done ✅)

The following packages were added to `package.json`:
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3"  // Browser-compatible bcrypt
  },
  "devDependencies": {
    "bcrypt": "^5.1.1",   // Node.js native bcrypt
    "@types/bcryptjs": "^2.4.6"  // TypeScript types
  }
}
```

**Already installed via:** `npm install`

### Step 2: Generate New Hash for Production Password

```bash
node scripts/generate-hash-parts.js "YourProductionPassword"
```

**Output Example:**
```
📋 Full Bcrypt Hash (includes embedded salt):
   $2b$10$Dv6C0Yw/y14rBS6vj3g9/.n1Pz3W4gWtiDKuqmdk8yZKRD9ao3Jru
   Length: 60 characters

📝 Copy this code into your auth.service.ts:
────────────────────────────────────────────────────────────────────────────────

  private readonly p1 = atob('JDJiJDEwJER2NkMwWXcveTE0ckI=');
  private readonly p2 = atob('UzZ2ajNnOS8ubjFQejNXNGdXdGk=');
  private readonly p3 = atob('REt1cW1kazh5WktSRDlhbzNKcnU=');
```

### Step 3: Update auth.service.ts

Replace lines 15-17 in `src/app/auth.service.ts` with the output from Step 2.

### Step 4: Test Locally

```bash
npm start
# Login with: CHANGE_ME (for testing)
```

### Step 5: Build and Deploy

```bash
npm run build
# Deploy dist/pipeband to AWS S3
```

---

## 🔍 Technical Details

### Bcrypt Hash Format

```
$2b$10$Dv6C0Yw/y14rBS6vj3g9/.n1Pz3W4gWtiDKuqmdk8yZKRD9ao3Jru
 │   │  │                      │
 │   │  └─ Salt (22 chars)     └─ Hash (31 chars)
 │   └─ Cost factor (10 = 2^10 iterations)
 └─ Algorithm identifier (2b = bcrypt)
```

**Total Length:** 60 characters (fixed)

### How bcrypt.compareSync Works

```typescript
// In auth.service.ts
const isValid = bcrypt.compareSync(userPassword, storedHash);
```

1. Extracts the salt from `storedHash`
2. Hashes the `userPassword` with the extracted salt
3. Compares in constant-time (prevents timing attacks)
4. Returns `true` if match, `false` otherwise

### Why 10 Rounds?

- **Cost Factor 10** = 2^10 = **1,024 iterations**
- Each password check takes approximately **100ms**
- Good balance between security and user experience
- Can be increased in future by changing `SALT_ROUNDS` in the script

**Comparison:**
| Cost | Iterations | Time per Hash | Security Level |
|------|------------|---------------|----------------|
| 8    | 256        | ~25ms         | Minimum |
| 10   | 1,024      | ~100ms        | Recommended ✅ |
| 12   | 4,096      | ~400ms        | High |
| 14   | 16,384     | ~1600ms       | Very High |

---

## ⚠️ Important Differences from SHA-256

### 1. **Each Hash is Unique (Even for Same Password)**

```bash
# Running the generator twice with same password:
node scripts/generate-hash-parts.js "password123"
# Output 1: $2b$10$ABC...xyz

node scripts/generate-hash-parts.js "password123"
# Output 2: $2b$10$DEF...uvw  (Different!)
```

**Why?** Bcrypt generates a new random salt each time.

**Impact:** You must regenerate and update the hash parts whenever you want to change credentials.

### 2. **Verification Uses compareSync, Not Equality**

```typescript
// OLD (SHA-256):
if (hashedInput === storedHash) { ... }

// NEW (Bcrypt):
if (bcrypt.compareSync(userPassword, storedHash)) { ... }
```

**Why?** Bcrypt needs to extract the salt and rehash for comparison.

### 3. **Slower is Better**

```typescript
// SHA-256: ~0.001ms per hash (TOO FAST = INSECURE)
// Bcrypt:  ~100ms per hash (INTENTIONALLY SLOW = SECURE)
```

**Why?** Makes brute-force attacks impractical. An attacker trying 1 billion passwords:
- SHA-256: ~16 minutes
- Bcrypt: **~3,170 years** ✅

---

## 🧪 Testing Checklist

- [ ] Run `npm install` to install bcrypt libraries
- [ ] Test local login with `CHANGE_ME` password
- [ ] Verify bcrypt comparison works (should take ~100ms)
- [ ] Generate production password hash
- [ ] Update `auth.service.ts` with production hash
- [ ] Test production login
- [ ] Verify rate limiting still works (5 attempts)
- [ ] Verify session expiration (24 hours)
- [ ] Test logout functionality
- [ ] Build and deploy

---

## 🛠️ Troubleshooting

### Problem: "Cannot find module 'bcryptjs'"

**Solution:**
```bash
npm install bcryptjs @types/bcryptjs --save
```

### Problem: "Cannot find module 'bcrypt'" (in script)

**Solution:**
```bash
npm install bcrypt --save-dev
```

### Problem: Login is slower than before

**Expected Behavior:** Bcrypt intentionally takes ~100ms to hash/compare. This is a security feature, not a bug!

### Problem: Hash generator produces different output each time

**Expected Behavior:** Bcrypt generates a unique salt each time. Both hashes are valid for the same password.

### Problem: Angular build errors with bcrypt types

**Solution:** Make sure you're using `bcryptjs` (not `bcrypt`) in Angular code:
```typescript
import * as bcrypt from 'bcryptjs';  // ✅ Correct
// NOT: import * as bcrypt from 'bcrypt';  // ❌ Wrong
```

---

## 📈 Performance Considerations

### Client-Side (Browser)

- **Login time increased by ~100ms** (one-time per session)
- **No impact on page load** (bcryptjs loaded on-demand)
- **Bundle size increase:** ~30KB for bcryptjs library

**Recommendation:** The 100ms increase is acceptable for significantly better security.

### Hash Generation (Script)

- **Time per password:** ~100ms
- **Acceptable for admin use:** Yes (only run when changing passwords)

---

## 🔄 Rolling Back (If Needed)

If you need to revert to SHA-256:

1. **Restore old auth.service.ts:**
```typescript
import * as sha256 from 'js-sha256';  // Instead of bcryptjs
const hashedInput = sha256.sha256(userPassword);
if (hashedInput === actualHash) { ... }
```

2. **Restore old hash generator script** (save backup first)

3. **Remove bcrypt dependencies:**
```bash
npm uninstall bcrypt bcryptjs @types/bcryptjs
```

**Note:** Not recommended due to security implications.

---

## 📚 Additional Resources

- [Bcrypt Wikipedia](https://en.wikipedia.org/wiki/Bcrypt)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [bcrypt npm package](https://www.npmjs.com/package/bcrypt)
- [bcryptjs npm package](https://www.npmjs.com/package/bcryptjs)

---

## ✅ Summary

Your authentication system now uses **bcrypt**, providing:

✅ **1000x+ better protection** against brute-force attacks
✅ **Built-in salt** (no manual salt management needed)
✅ **Industry-standard security** (recommended by OWASP)
✅ **Future-proof** (can increase cost factor over time)
✅ **Constant-time comparison** (prevents timing attacks)

**Action Required:** Generate new bcrypt hash for your production password and update `auth.service.ts` before deploying.

---

## 🆘 Need Help?

For questions about the bcrypt implementation:
1. Check `scripts/README-HASH-GENERATOR.md` for hash generator details
2. Review `SECURITY-IMPLEMENTATION.md` for overall security architecture
3. Contact the band's webmaster

**Current Default Password (Testing):** `CHANGE_ME`

