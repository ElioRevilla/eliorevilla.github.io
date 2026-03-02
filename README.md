# Elio Revilla — Portfolio

Personal portfolio website for **Elio Revilla**, AI Engineer, Data Scientist & Electronic Engineer.

🌐 **Live site**: [eliorevilla.github.io](https://eliorevilla.github.io)

---

## About

Single-page portfolio showcasing skills, projects and contact information. Built as a static site hosted on GitHub Pages with no backend required.

Supports **English / Spanish** language toggle.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | Tailwind CSS 3 + custom CSS |
| UI Components | Bootstrap 4.5 |
| JavaScript | jQuery + Typed.js, Owl Carousel, Isotope, Lightbox, Waypoints |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts — Inter |
| Hosting | GitHub Pages |

---

## Project Structure

```
eliorevilla.github.io/
├── index.html          # Main single-page site
├── dist/
│   └── output.css      # Compiled Tailwind CSS (production)
├── src/
│   └── input.css       # Tailwind source
├── css/                # Additional stylesheets
├── js/
│   └── main.js         # jQuery interactions and animations
├── img/                # Icons and project images
├── lib/                # Third-party libraries
├── scss/               # Legacy SCSS source
└── mail/               # Legacy contact form (unused)
```

---

## Local Development

**Prerequisites**: Node.js installed.

```bash
# Install dependencies
npm install

# Watch for Tailwind changes during development
npm run watch

# Build minified CSS for production
npm run build:minify
```

Open `index.html` directly in a browser or use any static file server.

---

## Deploy

This site is deployed automatically via **GitHub Pages** from the `main` branch.

After any change:

```bash
# If Tailwind classes were modified, rebuild first
npm run build:minify

git add .
git commit -m "description of changes"
git push origin main
```

The site updates at `https://eliorevilla.github.io` within ~1 minute.

---

## Features

- Bilingual UI (EN / ES) with instant toggle
- Animated hero section with typed text effect
- Filterable projects grid
- Skills section with technology icon grid
- Responsive design (mobile, tablet, desktop)
- Smooth scroll animations

---

## Contact

- LinkedIn: [linkedin.com/in/elio-revilla-perez](https://www.linkedin.com/in/elio-revilla-perez/)
- GitHub: [github.com/ElioRevilla](https://github.com/ElioRevilla)
- Email: eliorevillaperez@gmail.com
