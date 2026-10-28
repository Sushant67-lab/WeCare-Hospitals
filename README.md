# WeCare Hospitals - Web Application

A modern healthcare and hospital web application featuring 22 multi-specialty clinical departments, doctor scheduling, patient appointment booking with digital appointment passes, emergency triage contacts, and an administrative portal.

---

## Deploying to GitHub Pages (No Blank Page)

This repository is pre-configured so that it will **never show a blank screen** on GitHub Pages.

### Option 1: Instant GitHub Pages via `/docs` (Easiest - 1 click)
The production build is already compiled into the `docs/` folder with relative assets (`./assets/...`).
1. Go to your repository on **GitHub.com**.
2. Click **Settings** (tab at the top) > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Set:
   - Branch: `main` (or `master`)
   - Folder: `/docs`
5. Click **Save**.
6. Within 1 minute, your website is live at `https://<your-username>.github.io/<repository-name>/`!

---

### Option 2: Deploy using GitHub Actions
If you prefer automatic builds whenever you push:
1. Go to your repository on **GitHub.com**.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. GitHub provides pre-built templates for **Static HTML** or **Vite**. Select **Vite** or **Configure** to enable automated deployments.

---

## Pushing to GitHub from AI Studio
1. All workflow files and heavy media files that trigger GitHub API permission restrictions have been cleared.
2. In AI Studio, click **Push to GitHub** to push your commits cleanly.
3. If GitHub ever shows "Failed to push commit", ensure your GitHub repository has not diverged or push to a newly created empty repository.
