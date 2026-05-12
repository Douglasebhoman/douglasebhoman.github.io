# Architecture

## Repository structure

```
douglasebhoman.github.io/
├── assets/
│   ├── files/
│   │   └── Douglas_Ebhoman_CV.pdf
│   └── images/
│       ├── git-series-card.svg
│       ├── openweather-card.svg
│       ├── systems-over-sentences-card.png
│       ├── personal-website-guide-card.svg
│       ├── static-portfolio-card.svg
│       ├── site-docs-card.png
│       ├── mkdocs-for-technical-writers-card.png
│       ├── writing-for-developers-cover.png
│       ├── anatomy-of-great-documentation-cover.png
│       ├── about-image.png
│       └── headshot.jpg
├── blog/
│   ├── index.html
│   └── posts/
│       ├── from-writing-to-documentation-systems/
│       │   └── index.html
│       ├── your-documentation-is-a-bakery/
│       │   └── index.html
│       ├── how-product-teams-actually-handle-documentation/
│       │   └── index.html
│       ├── writing-for-developers-vs-non-technical-users/
│       │   └── index.html
│       └── anatomy-of-great-documentation/
│           └── index.html
├── cv/
│   └── index.html
├── site-docs/
│   ├── overview.md
│   ├── architecture.md
│   ├── local-setup.md
│   ├── deployment.md
│   ├── content-guide.md
│   └── contributing.md
├── CNAME
├── index.html
└── styles.css
```

## Key files

### index.html

The homepage. Contains all homepage sections inline: hero, activity strip, portfolio, about, social proof, skills, audit, and contact. Page-specific styles live in a `<style>` block in the `<head>`. JavaScript interactions are in a `<script>` block before `</body>`.

### styles.css

The global stylesheet shared across all pages. Centralises brand tokens, layout, navigation, typography, and component styles. All page-specific overrides live in inline `<style>` blocks on individual pages.

The stylesheet is linked from every page: homepage, blog index, all post pages, and the CV page.

### cv/index.html

The live CV page deployed at `douglasebhoman.com/cv/`. A version-controlled CV with a fixed top bar, metrics strip, two-column layout with sticky sidebar, outcome-led portfolio entries, a changelog section, and a PDF download button. The PDF is served from `assets/files/Douglas_Ebhoman_CV.pdf`.

This page is a Docs-as-Code artefact. It is version-controlled, maintained in the repository, and deployed through the same pipeline as every other page.

### CNAME

Connects the custom domain `douglasebhoman.com` to GitHub Pages. This tells GitHub which custom domain to use. The DNS CNAME record in Cloudflare tells the internet where that domain points.

### assets/files/

Contains `Douglas_Ebhoman_CV.pdf`. The CV page top bar and the contact section both link to this file for download. When the CV is updated, replace this file and push.

### assets/images/

All images used across the site. Stored in a flat structure because the site has no image processing pipeline. All images are referenced directly by filename.

## JavaScript interactions

The homepage uses vanilla JavaScript with no external libraries. All interactions are in the `<script>` block at the bottom of `index.html`.

| Interaction | What it does |
|-------------|-------------|
| Typed text effect | Cycles through four phrases in the hero headline |
| Scroll progress bar | Gold bar at the top of the viewport tracking scroll position |
| Card tilt effect | Portfolio cards tilt toward the cursor on hover |
| Card cursor gradient | Radial gold gradient follows the cursor inside each card |
| Stagger reveal | Cards and sections fade up as they enter the viewport |
| Counter animation | Activity strip numbers count up when the strip enters the viewport |
| Skills tabs | Three tabbed panels with interactive visual demonstrations |
| Diataxis quadrant | Clickable four-quadrant grid expanding on click |
| Before/After toggle | Code block toggling between undocumented and documented states |
| Documentation audit widget | Six-question scoring engine generating a scored health report |

## Documentation audit widget

The audit widget is the most complex component on the homepage. It lives entirely in `index.html` as inline HTML, CSS in the `<style>` block, and JavaScript in the `<script>` block.

The widget has four states:

1. Questions — six questions displayed one at a time with a step indicator
2. Loading — a spinner displayed for 1.8 seconds after the final answer
3. Results — score ring, animated category label, three health bars, five report sections, and a CTA
4. Restart — all state resets and the widget returns to question one

The scoring engine is rule-based. Answers map to score adjustments and pre-written report text across connectivity, architecture, and ownership dimensions.