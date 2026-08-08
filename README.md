# Techfest CA Program — Cyborg Landing Page

A responsive, cyborg-themed landing page concept for the **Techfest, IIT Bombay Campus Ambassador (CA) Program**. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- Dark, HUD-inspired visual identity — circuit grid background, scanlines, film grain, and a floating animated "visor" core in the hero section
- Custom animated cursor with hover states, plus an ambient canvas particle field
- Scroll-triggered reveal animations with staggered timing for grids and timelines
- Count-up animated statistics that trigger on scroll
- Interactive FAQ accordion
- Fully responsive layout, down to small mobile screens
- Respects `prefers-reduced-motion` for accessibility
- All "Apply" CTAs link directly to the official registration page at [ca.techfest.org](https://ca.techfest.org/)

## Tech Stack

- HTML5
- CSS3 (custom properties, clip-path, animations, no preprocessor)
- Vanilla JavaScript (no dependencies)
- Fonts: [Orbitron](https://fonts.google.com/specimen/Orbitron), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts

## Project Structure

```
ca-program-site/
├── index.html     
├── styles.css       
├── script.js         
└── README.md
```

## Getting Started

No build tools or dependencies required.

Then either:

- Open `index.html` directly in a browser, or
- Serve it locally for a cleaner dev experience:


## Customization

- **Apply button destination** — set in `script.js`:
  ```js
  const CA_APPLY_URL = 'https://ca.techfest.org/';
  ```
- **Color palette** — CSS custom properties at the top of `styles.css`:
  ```css
  :root{
    --bg: #050708;
    --cyan: #39f4d6;
    --magenta: #ff3d6e;
    --amber: #ffb020;
  }
  ```
- **Copy / sections** — edit directly in `index.html`; each section is clearly divided (hero, about, perks, selection path, ranks, FAQ, final CTA).

## Disclaimer

This is an independent, fan-made design concept created for demonstration purposes and is **not an official Techfest or IIT Bombay production**. All Apply buttons route to the genuine Techfest CA registration site.

## License

MIT — feel free to fork and adapt for your own use.
