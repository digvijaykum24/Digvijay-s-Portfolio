# Digvijay Kumar — Portfolio

Premium dark portfolio for Digvijay Kumar (Full Stack Web Developer | MERN Stack Developer).

**Stack:** React 18 + Vite · Tailwind CSS v4 · Framer Motion · React Icons · Lucide

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Where things live

| What | File |
| --- | --- |
| All content (bio, skills, projects, education, links) | `src/data/portfolio.js` |
| Sections | `src/components/*.jsx` |
| Theme colours, fonts, keyframes, glass/gradient utilities | `src/index.css` |
| SEO / Open Graph / JSON-LD | `index.html` |
| Portrait | `public/images/digvijay-kumar.webp` / `.jpg` |

## Before going live

1. Replace `https://your-domain.com` in `index.html`, `public/robots.txt` and `public/sitemap.xml`.
2. The contact form opens the visitor's mail app (no backend). To send directly, replace
   `onSubmit` in `src/components/Contact.jsx` with EmailJS, Formspree or your own API.
3. For a sharper hero image, drop a higher-resolution original portrait into
   `public/images/digvijay-kumar.webp` (portrait, 5:6 ratio).
