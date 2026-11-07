# ![Kansas City St Andrew Pipes and Drums logo](./src/assets/band_logo.webp)

# Kansas City St. Andrew Pipes & Drums Website

[![Angular](https://img.shields.io/badge/Angular-16.2-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Material-16.2-purple.svg)](https://material.angular.io/)
[![License](https://img.shields.io/badge/License-See%20LICENSE-green.svg)](./LICENSE)

A modern, responsive Angular web application for the [Kansas City St. Andrew Pipes & Drums](https://www.kcpipeband.org/), serving as the digital home for one of Kansas City's finest and oldest pipe and drum bands. The site provides resources for fans, prospective students, current members, and event organizers.

## 🌟 Features

### Public Features
- **🎵 Concert Announcements** - Eye-catching dismissible banner for upcoming events with ticket links
- **📸 Photo Gallery** - Responsive image galleries with lazy-loading and thumbnail optimization
- **🎼 Music Library** - Audio samples of performances and competition scores
- **📅 Performance Schedule** - Upcoming events and appearances
- **💼 Hire Us** - Information for booking the band for events
- **📞 Contact Information** - Easy ways to reach band leadership and instructors
- **ℹ️ About Us** - Band history, achievements, and member information

### Member Features (Protected)
- **🔐 Real Protection** - The password is checked on a server, and member files need a login cookie that CloudFront checks
- **🏆 Competition Results** - Detailed score sheets and judge recordings
- **📄 Band Documents** - Constitution, policies, and member resources
- **🎖️ 3D Models** - STL files for band cap badge and kilt pin
- **🚪 Session Management** - 24-hour sessions with automatic logout

### Technical Features
- **📱 Responsive Design** - Optimized for mobile, tablet, and desktop
- **⚡ Performance Optimized** - Lazy loading, WebP images, code splitting
- **♿ Accessible** - WCAG compliant with semantic HTML and ARIA labels
- **🔒 Security Enhanced** - Server-side password check, CloudFront signed cookies for member files, session management
- **🐳 Docker Support** - Containerized deployment with Nginx
- **📊 SEO Optimized** - Meta tags, OpenGraph, Twitter Cards, structured data

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Security Features](#-security-features)
- [Building & Deployment](#-building--deployment)
- [Project Structure](#-project-structure)
- [Scripts & Utilities](#-scripts--utilities)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [Documentation](#-documentation)
- [License](#-license)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/Pipeband.git
cd Pipeband

# Install dependencies
npm install

# Start development server
npm start

# Navigate to http://localhost:4200/
```

---

## 📦 Installation

### Prerequisites

- **Node.js** (v16.x or higher recommended)
- **npm** (v8.x or higher)
- **Angular CLI** (v16.x)
  ```bash
  npm install -g @angular/cli@16
  ```

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/Pipeband.git
   cd Pipeband
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment** (See [Configuration](#-configuration) section)

4. **Start Development Server**
   ```bash
   ng serve
   # or
   npm start
   ```

5. **Open Browser**
   Navigate to `http://localhost:4200/`

---

## ⚙️ Configuration

### Member Authentication Setup

The members password is checked by a small AWS Lambda, and member files under `src/assets/members/` need the signed cookies it sets. See [Member login (AWS)](#member-login-aws) for the one-time setup.

For local development, create the password hash once:

```bash
node scripts/generate-member-password-hash.js
```

This saves an scrypt hash to `.member-password-hash`, which git ignores. `npm start` runs the login Lambda locally with it, so logging in works on `http://localhost:4200`. You can also set a `MEMBER_PASSWORD_HASH` environment variable. Without either, the members login rejects every password.

**Security Note**: Never commit production passwords to version control!

### Environment Files

- `src/environments/environment.ts` - Production configuration
- `src/environments/environment.development.ts` - Development configuration

---

## 💻 Development

### Development Server

```bash
npm start
```

This starts the members login API on port 4310 and `ng serve`, which passes `/api` to it. Navigate to `http://localhost:4200/`. The application will automatically reload when you change source files.

### Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server with the members login API |
| `npm run build` | Build for production |
| `npm run watch` | Build with file watching |
| `npm test` | Run unit tests |
| `node --test aws/` | Run the login Lambda's tests |
| `ng generate component component-name` | Generate new component |
| `ng generate service service-name` | Generate new service |

### Code Scaffolding

Generate new components, services, directives, etc.:

```bash
ng generate component component-name
ng generate service service-name
ng generate directive directive-name
ng generate pipe pipe-name
ng generate guard guard-name
ng generate module module-name
```

### Development Best Practices

- ✅ Use TypeScript strict mode (already enabled)
- ✅ Follow Angular style guide
- ✅ Write unit tests for new features
- ✅ Use semantic HTML and ARIA labels
- ✅ Optimize images (WebP format, responsive sizes)
- ✅ Test on multiple devices and browsers

---

## 🔒 Security Features

1. **Password checked on a server.** `src/app/auth.service.ts` sends the password to `/api/login`, which CloudFront routes to the login Lambda (`aws/member-login/index.mjs`). The site's code holds no password or hash.
2. **Member files need a login.** On a correct password the Lambda sets CloudFront signed cookies (HttpOnly, Secure, only sent to `/assets/members/`). CloudFront refuses any `/assets/members/*` request without valid cookies, so a copied file URL doesn't work for anyone else.
3. **Slow to guess.** The hash is scrypt, a wrong password waits half a second, and the Lambda's reserved concurrency of 2 caps how many guesses can run at once. The login page also locks for 15 minutes after 5 wrong passwords.
4. **24-hour sessions.** The cookies and the members pages both expire after 24 hours (`SESSION_HOURS`), and logging out clears both.

The members pages themselves (lists of tunes, links, the Band Info text) are part of the site's code, so they aren't secret; everything sensitive should be a file under `src/assets/members/`. Keep the GitHub repository private, because it contains those files.

📚 **Detailed Security Guide**: See [SECURITY-IMPLEMENTATION.md](./SECURITY-IMPLEMENTATION.md)

---

## 🎼 Adding Sheet Music

The members area has a **Sheet Music** tab (`/members/music`) (sortable and filterable by tune, idiom, composer, instrument and date). Scores are PDFs in `src/assets/members/sheet-music/`, listed in `src/app/members/sheet-music/sheet-music.data.ts`.

1. Copy the PDF into `src/assets/members/sheet-music/pipes/` or `src/assets/members/sheet-music/drums/` (lowercase, hyphenated file names, e.g. `wha-saw-the-forty-second.pdf`). Convert TIF scans to PDF first.
2. Optionally copy a practice recording into `src/assets/members/sheet-music/audio/`.
3. Add one entry to `SHEET_MUSIC` with the title, idiom, composer, instrument and today's date as `modified` (`YYYY-MM-DD`). Use the same `tune` value on a tune's pipe and drum scores so they link together.

Scores modified in the last 30 days show a **New** icon automatically. When a score is revised, update its `modified` date.

> **Note:** everything under `src/assets/members/` needs a members login once the CloudFront setup in [Member login (AWS)](#member-login-aws) is done.

## 🏗️ Building & Deployment

### Build for Production

```bash
ng build --configuration production
# or
npm run build
```

Build artifacts will be in the `dist/pipeband` directory.

### Docker Deployment

#### Build Docker Image

```bash
docker build -t pipeband-image .
```

#### Run Container

```bash
docker run --name pipeband-container -d -p 8080:80 pipeband-image
```

Navigate to `http://localhost:8080/`

### AWS S3 + CloudFront Deployment

This site is designed to run as a static website on AWS:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/pipeband s3://your-bucket-name --delete
   ```

3. **Invalidate CloudFront cache**
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

#### Page shells and the CloudFront Function

`npm run build` also runs `scripts/write-page-shells.js`, which writes `hire/index.html`, `join/index.html` and so on with each page's title, description and link-preview tags from `src/app/page-meta.json`. Facebook and other link previews don't run JavaScript, so this is what lets a shared link show the right page. To change a page's title or description, edit `page-meta.json`.

CloudFront needs `cloudfront/rewrite-page-paths.js` to serve `/hire` from `hire/index.html`. One-time setup in the CloudFront console:

1. **Functions → Create function**, name `rewrite-page-paths`, runtime `cloudfront-js-2.0`. Paste in the file's contents and **Save changes**.
2. On the **Test** tab, check a few viewer request URLs: `/hire` and `/join/` should become `/hire/index.html` and `/join/index.html`; `/assets/tartan.webp` and `/` should be unchanged.
3. **Publish** the function, then **Add association**: your distribution, the default behavior, event type **Viewer request**.
4. Once the distribution finishes deploying, invalidate `/*` as above.

Check a page with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/): `https://www.kcpipeband.org/join` should show "Join the Band" and its description.

To roll back, remove the association from the default behavior. The site then works exactly as before, and the page shells go unused.

#### Member login (AWS)

One-time setup. Do steps 1 to 4 **before** deploying a build that uses the login Lambda, or nobody can log in. It should cost nothing at this site's traffic.

1. **Signing key.** Run `node scripts/generate-cloudfront-key.js`. It saves a key pair in `cloudfront-keys/` (git-ignored) and prints both keys.
   - CloudFront → **Public keys** → **Create public key**: paste the public key. Note the key's **ID**.
   - CloudFront → **Key groups** → **Create key group**: name it `members` and add that key.
2. **Password hash.** Run `node scripts/generate-member-password-hash.js` and copy the `scrypt$...` line it prints.
3. **Lambda.** Lambda → **Create function** → name `kcpipeband-member-login`, runtime **Node.js 22.x**.
   - Replace the code with `aws/member-login/index.mjs` and **Deploy**.
   - **Configuration → Environment variables**: `MEMBER_PASSWORD_HASH` (step 2), `CLOUDFRONT_KEY_PAIR_ID` (the key ID from step 1), `CLOUDFRONT_PRIVATE_KEY_BASE64` (the long line from step 1).
   - **Configuration → Concurrency**: reserved concurrency **2**.
   - **Configuration → Function URL → Create**: auth type **NONE**. Copy the URL's host name, for example `abc123.lambda-url.us-east-1.on.aws`.
4. **CloudFront.** In the distribution:
   - **Origins → Create origin**: the Function URL host name, protocol **HTTPS only**.
   - **Behaviors → Create behavior**: path `/api/*`, that origin, viewer protocol **Redirect HTTP to HTTPS**, allowed methods **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE**, cache policy **CachingDisabled**, origin request policy **AllViewerExceptHostHeader**.
   - **Behaviors → Create behavior**: path `/assets/members/*`, the S3 origin, **Restrict viewer access: Yes**, trusted key group `members`, cache policy **CachingOptimized**.
5. **Deploy** the site as above and invalidate `/*`.

Check it: log in on the live site and open a score. Then paste the score's address into a private window; it should be refused.

**Changing the password:** rerun step 2, paste the new value into `MEMBER_PASSWORD_HASH`, and save. Existing sessions last until they expire.

**Rolling back:** set **Restrict viewer access** on the `/assets/members/*` behavior back to **No**. Member files then open without a login again, and logging in still works.

### Nginx Configuration

The included `nginx.conf` provides SPA routing only. Production runs on S3 and CloudFront, not Nginx.

---

## 📁 Project Structure

```
Pipeband/
├── src/
│   ├── app/
│   │   ├── about/              # About Us page
│   │   ├── contact/            # Contact page
│   │   ├── hire/               # Hire Us page
│   │   ├── home/               # Home page (with concert banner)
│   │   ├── login/              # Login page (enhanced security)
│   │   ├── members/            # Members-only section (protected)
│   │   ├── music/              # Music library
│   │   ├── photos/             # Photo galleries
│   │   ├── schedule/           # Performance schedule
│   │   ├── auth.service.ts     # Members login (calls /api/login)
│   │   ├── auth.guard.ts       # Route guard
│   │   └── meta.service.ts     # SEO meta tags service
│   ├── assets/
│   │   ├── optimized/          # Optimized WebP images
│   │   ├── photos/             # Photo gallery images
│   │   ├── members/            # Member files (need a login): sheet music, score sheets, documents, 3D
│   │   └── band_logo.webp      # Band logo
│   ├── environments/           # Environment configurations
│   └── styles.css              # Global styles
├── scripts/
│   ├── generate-member-password-hash.js  # Members password hash
│   ├── generate-cloudfront-key.js        # Key pair for the member file cookies
│   ├── dev-server.js                     # npm start: login API + ng serve
│   ├── generate_thumbnails.py  # Photo thumbnail generator
├── aws/member-login/           # Members login Lambda and its tests
├── cloudfront/                 # CloudFront Function for page shells
├── Dockerfile                  # Docker configuration
├── nginx.conf                  # Nginx server config
├── package.json                # npm dependencies
├── angular.json                # Angular CLI configuration
├── SECURITY-IMPLEMENTATION.md  # Security documentation
└── README.md                   # This file
```

---

## 🛠️ Scripts & Utilities

### Generate the Members Password Hash

```bash
# Interactive mode (password hidden)
node scripts/generate-member-password-hash.js

# Command-line mode
node scripts/generate-member-password-hash.js "YourPassword"
```

It prints the value for the Lambda's `MEMBER_PASSWORD_HASH` and saves it to `.member-password-hash` for `npm start`.

### Generate the CloudFront Signing Key

```bash
node scripts/generate-cloudfront-key.js
```

See [Member login (AWS)](#member-login-aws) for where each key goes.

### Generate Photo Thumbnails

Generate optimized thumbnails for photo galleries:

**Prerequisites:**
```bash
pip install Pillow
```

**Usage:**
```bash
python scripts/generate_thumbnails.py GALLERY_ID
```

Example:
```bash
python scripts/generate_thumbnails.py 2024_Highland_Games
```

This creates 400x400 WebP thumbnails in `src/assets/photos/GALLERY_ID/thumbs/`

### Generate Photo Manifest

Generate manifest JSON files for photo galleries:

```bash
# PowerShell
.\scripts\Generate-Manifest.ps1 -DirectoryPath ./src/assets/photos/2026_Waukesha_Games

# Bash
bash scripts/generate_manifest.sh "2024_Highland_Games"
```

---

## 🧪 Testing

### Unit Tests

```bash
ng test
```

Executes unit tests via [Karma](https://karma-runner.github.io)

### Code Coverage

```bash
ng test --code-coverage
```

Coverage report will be in `coverage/` directory.

### End-to-End Tests

```bash
ng e2e
```

Note: You need to add an e2e testing package first (e.g., Cypress, Playwright)

**Recommended Setup:**
```bash
ng add @cypress/schematic
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow Angular style guide
   - Write/update tests
   - Update documentation
4. **Test your changes**
   ```bash
   npm test
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- Follow [Angular Style Guide](https://angular.io/guide/styleguide)
- Use TypeScript strict mode
- Write meaningful commit messages
- Document public APIs with JSDoc
- Add unit tests for new features

### Before Committing

- ✅ Run tests: `npm test`
- ✅ Check linting: `ng lint`
- ✅ Build successfully: `npm run build`
- ✅ Update documentation if needed

---

## 📚 Documentation

### Main Documentation

- **[README.md](./README.md)** (this file) - Project overview and setup
- **[SECURITY-IMPLEMENTATION.md](./SECURITY-IMPLEMENTATION.md)** - Security architecture and implementation
- **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Community guidelines
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[LICENSE](./LICENSE)** - Project license

### Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🎯 Roadmap

### Planned Features

- [ ] Email newsletter signup
- [ ] Event calendar with iCal export
- [ ] Online store for merchandise
- [ ] Member directory with profiles
- [ ] Practice attendance tracking
- [ ] Sheet music library
- [ ] Video gallery
- [ ] Blog/news section

### Future Enhancements

- [ ] Server-side authentication (Lambda@Edge)
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Performance monitoring

---

## 🐛 Troubleshooting

### Common Issues

#### Login Always Fails
**Locally:** `npm start` prints a warning if `.member-password-hash` is missing or still holds an old bcrypt hash. Create a new one with:
```bash
node scripts/generate-member-password-hash.js
```

**On the live site:** "Couldn't reach the login service" means CloudFront isn't sending `/api/*` to the Lambda; check the `/api/*` behavior. "Invalid password" with the right password means `MEMBER_PASSWORD_HASH` in the Lambda doesn't match; regenerate it.

#### A Member File Won't Open
The member's login has probably expired, or the cookies were cleared. Log out and log in again. If no one can open files, check that `CLOUDFRONT_KEY_PAIR_ID` matches the public key in the `members` key group.

#### Docker Image Too Large
**Solution**: Add `.dockerignore` with:
```
node_modules
dist
.git
*.md
```

#### Photos Not Loading
**Solution**: 
1. Check if thumbnails exist: `src/assets/photos/GALLERY_ID/thumbs/`
2. Regenerate thumbnails: `python scripts/generate_thumbnails.py GALLERY_ID`
3. Verify manifest.json exists in gallery folder

### Getting Help

- 📧 Contact: [BusinessManager@kcpipeband.org](mailto:BusinessManager@kcpipeband.org)
- 🐛 Report bugs: Open a GitHub issue
- 💬 Discussions: GitHub Discussions tab

---

## 👥 Team

**Kansas City St. Andrew Pipes & Drums**
- Website: [kcpipeband.org](https://www.kcpipeband.org)
- Facebook: [@Kansas-City-St-Andrew-Pipes-and-Drums](https://www.facebook.com/Kansas-City-St-Andrew-Pipes-and-Drums-273250496949)
- Email: [BusinessManager@kcpipeband.org](mailto:BusinessManager@kcpipeband.org)

---

## 📄 License

This project is licensed under the terms specified in the [LICENSE](./LICENSE) file.

**Copyright © 2023-2026 Kansas City St. Andrew Pipes & Drums**

All rights reserved.

---

## 🙏 Acknowledgments

- **Angular Team** - For the excellent framework
- **Angular Material** - For beautiful UI components
- **Band Members** - For content and feedback
- **Contributors** - For improvements and bug fixes

---

## 📞 Contact & Support

### Band Contact
- **Business Manager**: Rory McKee - [BusinessManager@kcpipeband.org](mailto:BusinessManager@kcpipeband.org)
- **Bagpipe Lessons**: Dorothy May - [BagpipeLessons@kcpipeband.org](mailto:BagpipeLessons@kcpipeband.org)
- **Drum Lessons**: Kyle Womelduff - [DrumLessons@kcpipeband.org](mailto:DrumLessons@kcpipeband.org)
- **Quartermaster**: Rydel Van Dyke - [vandyke6059@twc.com](mailto:vandyke6059@twc.com)

### Practice Location
**St. Andrew's Episcopal Church**  
6401 Wornall Terrace  
Kansas City, MO 64113  
Tuesday nights, 7:00 PM - 9:00 PM

### Mailing Address
**PO Box 648**  
Shawnee Mission, KS 66201-0648

---

## ⭐ Star This Repository

If you find this project useful, please consider giving it a star on GitHub!

---

**Made with ❤️ by the Kansas City St. Andrew Pipes & Drums community**

🎵 *Ceòl is Càirdeas* (Music and Friendship) 🎵
