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
- **🔐 Secure Authentication** - Bcrypt-based password hashing with rate limiting
- **🏆 Competition Results** - Detailed score sheets and judge recordings
- **📄 Band Documents** - Constitution, policies, and member resources
- **🎖️ 3D Models** - STL files for band cap badge and kilt pin
- **🚪 Session Management** - 24-hour sessions with automatic logout

### Technical Features
- **📱 Responsive Design** - Optimized for mobile, tablet, and desktop
- **⚡ Performance Optimized** - Lazy loading, WebP images, code splitting
- **♿ Accessible** - WCAG compliant with semantic HTML and ARIA labels
- **🔒 Security Enhanced** - Client-side rate limiting, bcrypt hashing, session management
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

The site includes a protected members-only section. To configure authentication:

#### Option 1: Use Default Password (For Testing)

Default password: `CHANGE_ME`

The repository includes pre-configured hash parts for this password. You can start developing immediately.

#### Option 2: Set Your Production Password

1. **Generate Hash Parts**
   ```bash
   node scripts/generate-hash-parts.js "YourProductionPassword"
   ```

2. **Update `src/app/auth.service.ts`**
   
   Copy the output from the script and replace lines 15-17:
   ```typescript
   private readonly p1 = atob('YOUR_GENERATED_PART_1');
   private readonly p2 = atob('YOUR_GENERATED_PART_2');
   private readonly p3 = atob('YOUR_GENERATED_PART_3');
   ```

3. **Security Note**: Never commit production passwords to version control!

📚 **Detailed Guide**: See [scripts/README-HASH-GENERATOR.md](./scripts/README-HASH-GENERATOR.md)

### Environment Files

- `src/environments/environment.ts` - Production configuration
- `src/environments/environment.development.ts` - Development configuration

---

## 💻 Development

### Development Server

```bash
ng serve
# or
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change source files.

### Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run watch` | Build with file watching |
| `npm test` | Run unit tests |
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

This application implements multiple layers of security for the members-only section:

### 1. **Bcrypt Password Hashing** ✅
- Industry-standard bcrypt algorithm with 10 salt rounds
- Hash split into 3 obfuscated parts to make it harder to find in JS bundle
- Automatic salt generation and management
- ~100ms computation time prevents brute-force attacks

### 2. **Rate Limiting** ✅
- 5 failed login attempts trigger 15-minute lockout
- Lockout persists across page refreshes
- Live countdown timer shows remaining lockout time
- Visual feedback on remaining attempts

### 3. **Session Management** ✅
- 24-hour automatic session expiration
- Secure token generation with timestamps
- Session validation on every protected route access
- Manual logout functionality

### 4. **Security Considerations**

⚠️ **Important**: This is client-side authentication suitable for:
- ✅ Non-sensitive member content
- ✅ Competition scores and band documents
- ✅ Keeping casual visitors out

❌ **Not suitable for**:
- Personal information
- Financial data
- HIPAA/GDPR protected content

For true security, consider:
- AWS Lambda@Edge for edge authentication
- AWS Cognito for managed auth
- API Gateway + Lambda for server-side validation

📚 **Detailed Security Guide**: See [SECURITY-IMPLEMENTATION.md](./SECURITY-IMPLEMENTATION.md)

---

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

### Nginx Configuration

The included `nginx.conf` provides:
- Gzip compression
- Browser caching headers
- SPA routing support
- Security headers

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
│   │   ├── auth.service.ts     # Authentication service (bcrypt)
│   │   ├── auth.guard.ts       # Route guard
│   │   └── meta.service.ts     # SEO meta tags service
│   ├── assets/
│   │   ├── optimized/          # Optimized WebP images
│   │   ├── photos/             # Photo gallery images
│   │   ├── score-sheets/       # Competition recordings & PDFs
│   │   └── band_logo.webp      # Band logo
│   ├── environments/           # Environment configurations
│   └── styles.css              # Global styles
├── scripts/
│   ├── generate-hash-parts.js  # Bcrypt hash generator
│   ├── generate_thumbnails.py  # Photo thumbnail generator
│   └── README-HASH-GENERATOR.md
├── Dockerfile                  # Docker configuration
├── nginx.conf                  # Nginx server config
├── package.json                # npm dependencies
├── angular.json                # Angular CLI configuration
├── SECURITY-IMPLEMENTATION.md  # Security documentation
├── BCRYPT-UPGRADE-GUIDE.md     # Bcrypt migration guide
└── README.md                   # This file
```

---

## 🛠️ Scripts & Utilities

### Generate Password Hash Parts

Generate secure bcrypt hash for member authentication:

```bash
# Interactive mode (password hidden)
node scripts/generate-hash-parts.js

# Command-line mode
node scripts/generate-hash-parts.js "YourPassword"
```

📚 **Full Documentation**: [scripts/README-HASH-GENERATOR.md](./scripts/README-HASH-GENERATOR.md)

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
.\scripts\Generate-Manifest.ps1 -GalleryId "2024_Highland_Games"

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
- **[BCRYPT-UPGRADE-GUIDE.md](./BCRYPT-UPGRADE-GUIDE.md)** - Bcrypt migration and technical details
- **[scripts/README-HASH-GENERATOR.md](./scripts/README-HASH-GENERATOR.md)** - Hash generator utility guide
- **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Community guidelines
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
- **[LICENSE](./LICENSE)** - Project license

### Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
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
**Solution**: Verify the hash parts in `auth.service.ts` match your password. Regenerate with:
```bash
node scripts/generate-hash-parts.js "YourPassword"
```

#### Build Errors with bcrypt
**Solution**: Ensure you have both `bcrypt` and `bcryptjs` installed:
```bash
npm install bcrypt bcryptjs @types/bcryptjs
```

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
