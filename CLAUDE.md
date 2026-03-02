# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Elio Revilla (AI Engineer, Data Scientist, Electronic Engineer). Static HTML/CSS/JavaScript site hosted on GitHub Pages.

## Technology Stack

- **Framework**: Bootstrap 4.5.3
- **Styling**: SCSS compiled to CSS
- **JavaScript**: jQuery with plugins (Typed.js, Owl Carousel, Isotope, Lightbox, Waypoints)
- **Icons**: Font Awesome 5.10.0
- **Fonts**: Google Fonts (Roboto)
- **Backend**: PHP for contact form (contact.php)

## Development Commands

This is a static site with no build system. SCSS files require manual compilation if modified:

```bash
# If using sass CLI to compile SCSS changes
sass scss/style.scss css/style.css
```

To test locally, serve via any static file server or open `index.html` directly.

## Architecture

### Bilingual System
The site supports English/Spanish switching via CSS classes:
- Elements with class `.en` are English content
- Elements with class `.es` are Spanish content
- JavaScript functions `showEnglish()` and `showSpanish()` toggle visibility

### Key Files
- `index.html` - Main single-page site (all content)
- `js/main.js` - jQuery interactions and animations
- `scss/style.scss` - Main SCSS source (imports Bootstrap)
- `mail/contact.js` - AJAX form submission handler
- `mail/contact.php` - Server-side form processing

### Design System
- Primary color: `#0BCEAF` (teal)
- Accent color: `#f9b625` (gold)
- SCSS variables defined in `scss/bootstrap/_variables.scss`

### Third-Party Libraries (in lib/)
- **Typed.js** - Animated text typing effect in hero section
- **Owl Carousel** - Testimonial carousel
- **Isotope** - Portfolio grid filtering
- **Lightbox** - Image gallery overlays
- **Waypoints** - Scroll-triggered animations

## Content Structure

Single-page layout with anchor navigation:
1. Hero section with profile and typed animation
2. Skills section with technology icon grid
3. Projects section with filterable portfolio cards
4. Contact section
5. Footer with social links
