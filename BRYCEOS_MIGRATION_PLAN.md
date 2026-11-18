# BryceOS migration plan

## Repository audit

- Framework: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3.
- Deployment: standard Next.js build compatible with the current Vercel deployment; no custom server or platform-specific runtime.
- Existing routes preserved:
  - `/`
  - `/about`
  - `/projects/pigball-machine`
  - `/projects/line-following-robot`
  - `/projects/spark-lab`
  - `/projects/portable-console`
  - `/projects/water-bottle`
  - `/projects/speaker-project`
- Project content source: `data/projects.ts`.
- Existing media: 31 tracked project/personal images, two local MOV demonstrations, and one Google Drive demonstration.
- Existing external links: LinkedIn and Spark Lab. GitHub and email were supplied with the BryceOS brief.
- Resume: supplied one-page PDF, now stored unchanged under `public/resume/` with a PNG preview for browser compatibility.

## Preservation rules

- Keep `data/projects.ts` as the source of truth for project copy and media.
- Keep all six `/projects/[slug]` URLs available for direct recruiter links.
- Keep `/about` available while its content is progressively moved into the BryceOS window system.
- Do not rename or recompress original project media during the UI migration.
- Keep `npm run build` as the production build command for Vercel compatibility.

## Milestones

### 1. Desktop shell and reusable window manager - complete

- System 7-inspired design tokens, wallpaper, menu bar, desktop icons, and window chrome.
- Reusable windows with open, close, focus, overlap, drag, resize, maximize, and boundary handling.
- Mobile windows become full-screen and desktop icons open with a single tap.
- Boot, restart, and shutdown states.
- First-pass applications use verified portfolio and resume content.
- Existing project and about routes remain available.

### 2. Project application depth

- Move the complete project case-study renderer into nested BryceOS windows.
- Add the classic image viewer and vintage video player chrome.
- Preserve direct `/projects/[slug]` access, with the matching project window opened on arrival.
- Verify both local MOV files and the Google Drive embed in production.

### 3. Content applications

- Expand Work Experience entries with structured, resume-verified details.
- Add the full About gallery to the desktop experience.
- Add selectable San Jose and San Diego information dialogs to the Map application.
- Add any project-specific GitHub/documentation URLs after they are supplied or verified.

### 4. System polish and release

- Add optional icon repositioning and persistent desktop preferences.
- Add a user-triggered, original startup sound if desired.
- Cross-browser keyboard, touch, reduced-motion, and media testing.
- Lighthouse/accessibility pass, Vercel preview deployment, and final production review.

## Information still needed for later milestones

- Project-specific GitHub or documentation links, where available.
- Any preferred photographs for San Jose or San Diego map dialogs.
- Whether the resume phone number should remain visible in the public embedded preview.
