
  # Premium Image-First Academy Website

  This is a code bundle for Premium Image-First Academy Website. The original project is available at https://www.figma.com/design/VvgUy4JdkA4vevBDQ5HMoc/Premium-Image-First-Academy-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Server-side contact email setup

  1. Create `.env` in the project root using `.env.example`.
  2. Fill SMTP values (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`).
  3. Keep `CONTACT_TO=julukuntlasakethreddy@gmail.com` (or change if needed).
  4. Run `npm run dev:full` to start both frontend and backend.

  The frontend contact form sends data to `/api/contact` and the backend sends email using Nodemailer.

  ## Vercel mail setup

  For Vercel deployments, contact email is sent from the serverless function at `api/contact.js`.

  Add these Environment Variables in Vercel Project Settings:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `SMTP_FROM`
  - `CONTACT_TO`

  ## Image loading on deployment

  This project stores image assets using Git LFS. A `prebuild` script runs `git lfs pull && git lfs checkout` before `vite build` so hardcoded image paths in `public/*` resolve to real files during deployment.
  