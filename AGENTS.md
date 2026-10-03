# 固態電子導論 (Introduction to Solid State Electronics) - Project Guidelines & Rules

Welcome to the **固態電子導論** project! This repository contains course materials, chapters, interactive 3D simulations, and documentation built with **VitePress** and deployed to **GitHub Pages**.

---

## 🚨 4 Core Project Rules

### 1. Secret Token Protection
- **Never** commit API keys, personal access tokens, credentials, or `.env` secrets into the repository.
- Always use environment variables or local mock fallbacks for sensitive configurations.

### 2. Large PDF & `.gitignore` Management
- **Never** commit large binary files such as large textbooks or course PDFs (e.g., `sspd-eee-swapnil.pdf`) directly into Git if they exceed repository size limits or are tracked locally.
- Ensure `.gitignore` properly excludes build outputs, dependency directories, environment files, and local PDF files.

### 3. Chapter Naming & Auto-Sidebar Convention
- Chapter files must follow the strict naming convention: `000x-name.md` (e.g., `0001-introduction.md`, `0002-crystal-structures.md`).
- VitePress sidebar configurations should automatically or explicitly map these chapters in sequential order.

### 4. 3D Canvas (`<CrystalViewer />`) Component Usage
- Interactive crystal lattice and semiconductor device visualizations are powered by Three.js wrapped in Vue components (e.g., `<CrystalViewer />`).
- Ensure all 3D components safely handle client-side mounting (`if (typeof window !== 'undefined')`) to prevent SSR window/canvas errors during VitePress builds.

---

## 🚀 Deployment Process & GitHub Pages
- **Framework**: VitePress (`docs/` directory)
- **Base URL**: Configured in `docs/.vitepress/config.js` or `config.ts` matching the GitHub repository base path (e.g., `base: '/固態電子導論/'`).
- **CI/CD**: GitHub Actions workflow builds the VitePress site and deploys it automatically to GitHub Pages on every push to `main` / `master`.
