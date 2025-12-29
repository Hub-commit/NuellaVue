NuellaVue Cleaning Agency — Frontend

What I added
- Responsive hero with video background and CTA
- 3D glassmorphism service cards (click to open booking modal)
- Before/After interactive slider
- Cursor "sparkle" trail and micro-interactions
- Booking modal that compiles form fields and opens WhatsApp chat to the agency number (+2349073184174)
- Mobile-responsive modal and layout tweaks

Local testing
1. Open `index.html` in a browser (double-click or use a static server).
2. Click "Request a Deep Clean" or choose a service card to open the booking modal.
3. Fill in details and click "Get Costing" — this opens WhatsApp (web or app) with a prefilled message to the agency.

Notes
- Agency WhatsApp: +234 907 318 4174 (used in the share link as 2349073184174)
- If you want the WhatsApp link to send to a different number, edit `script.js` and change `agencyNumber`.

Push to GitHub
1. Create a new GitHub repo (e.g. `nuellavue-site`).
2. From this project folder run:

```bash
git init
git add .
git commit -m "Initial NuellaVue frontend"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/nuellavue-site.git
git push -u origin main
```

Deploy to Vercel (Static)
Option A — Connect GitHub (recommended):
- Go to https://vercel.com, sign in and import the GitHub repo.
- Vercel autodetects static sites; no build command needed. Set the root to the repo root.
- Deploy — every push to `main` will redeploy.

Option B — Manual upload:
- Zip the project and drag-and-drop into Vercel's "Import Project" UI or use Vercel CLI.

Extra suggestions
- Replace video with a self-hosted optimized MP4 or HLS for faster loading.
- Use hosted fonts (Google Fonts) or bundle `Montserrat` in `index.html`.
- For production, host images and logos locally or from a CDN to avoid mixed-content issues.

If you want, I can:
- Add a GitHub Actions workflow to auto-deploy to Vercel or Netlify.
- Package this into a tiny React app for more advanced animations (Three.js cursor, refined slider).

