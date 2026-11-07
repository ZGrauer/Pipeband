# Members Login and File Protection

How the members area is protected. Setup steps are in the README under "Member login (AWS)".

## How it works

1. A member types the password on `/login`. `src/app/auth.service.ts` POSTs it to `/api/login`.
2. CloudFront sends `/api/*` to the login Lambda, `aws/member-login/index.mjs`.
3. The Lambda compares the password with `MEMBER_PASSWORD_HASH` (scrypt, constant-time comparison). On a match it signs a CloudFront policy for `https://*/assets/members/*`, valid for 24 hours, and returns it as three cookies: `CloudFront-Policy`, `CloudFront-Signature` and `CloudFront-Key-Pair-Id`. They are `HttpOnly`, `Secure`, `SameSite=Strict` and only sent to `/assets/members/`.
4. The CloudFront behavior for `/assets/members/*` restricts viewer access to the `members` key group. CloudFront checks the cookies on every member file request and refuses it without valid ones. The files live in the private `kcpipeband-members` bucket, which only CloudFront can read (origin access control), because the main site bucket is public.
5. The site stores only the session's end time in localStorage, so the members pages know whether to show. Logging out clears that and calls `/api/logout`, which expires the cookies.

## What is protected

- **Protected:** every file under `src/assets/members/` (sheet music, recordings, score sheets, band documents, 3D files). A copied file URL doesn't work without a login.
- **Not protected:** the members pages' own text and lists (tune names, links, Band Info), because they are part of the site's JavaScript. Put anything sensitive in a file under `src/assets/members/`, never in the page code or anywhere else in `src/assets`.
- **The GitHub repository** contains the member files, so it must stay private.

## Guessing the password

- scrypt makes each guess expensive, and a wrong password waits 500 ms before the reply.
- The Lambda's reserved concurrency of 2 limits how many guesses can run at once.
- The login page locks for 15 minutes after 5 wrong passwords. That lock is in the browser, so it only slows casual guessing; the server-side limits above are what count.
- A long password matters most. If the password leaks, change it (README, "Changing the password").

## Secrets

| Secret | Where it lives |
|---|---|
| Members password | Only in members' heads. Never stored. |
| Password hash | Lambda environment variable `MEMBER_PASSWORD_HASH`, and the git-ignored `.member-password-hash` for local development |
| CloudFront private key | Lambda environment variable `CLOUDFRONT_PRIVATE_KEY_BASE64`, and the git-ignored `cloudfront-keys/` folder |

If the private key leaks, run `node scripts/generate-cloudfront-key.js --replace`, add the new public key to the `members` key group, update the Lambda's two key settings, then remove the old public key.

## Tests

- `node --test aws/`: the Lambda's password check, cookie signing (verified with the public key), logout and refusals.
- `ng test`: `auth.service.spec.ts` and `login.component.spec.ts` cover the site's side of the login.
