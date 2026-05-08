# douglasebhoman.com

> Documentation is infrastructure. I treat it that way.

A technical writer who advocates for documentation as infrastructure should be able to build, version-control, and deploy their own web presence using the same principles they apply to documentation systems. This repository is that argument made concrete.

**Live site:** [douglasebhoman.com](https://douglasebhoman.com) · **Live CV:** [douglasebhoman.com/cv](https://douglasebhoman.com/cv)

---

## What this is

This repository is the source for my personal website, portfolio, blog, and live CV. It is hand-built in HTML and CSS with no frameworks, no static site generators, and no dependencies. Every page is a plain HTML file. Every interaction is vanilla JavaScript. It deploys automatically to GitHub Pages on every push to `main`.

The site is not a template. It is not a theme. It is a working documentation system built and maintained by the person it represents.

---

## Architecture

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

---

## Design decisions

Every decision here was made deliberately. This section explains the reasoning so the architecture is legible to anyone reading it, including future me.

**No framework.** Every line of HTML and CSS is written by hand. Building without a framework forces a precise understanding of how the web actually works. For a technical writer who teaches Git-based workflows, the site infrastructure should be as transparent as the documentation it supports.

**Static only.** No server, no database, no build step beyond deployment. Plain HTML files sharing a single `styles.css`. This keeps the security surface area minimal, the deployment pipeline simple, and the maintenance overhead close to zero.

**GitHub Pages and Cloudflare.** The site is hosted on GitHub Pages and served through a custom domain managed via Cloudflare. HTTPS is handled automatically via Let's Encrypt. DNS records are set to DNS-only with no Cloudflare proxy, to allow GitHub's certificate issuance to work correctly.

**Navy, gold, silver palette.** `#18222C` navy, `#A68959` gold, `#B8C0CC` silver. Chosen to signal precision and authority without the clinical sterility of pure black and white. Gold communicates craft and intentionality.

**DM Mono and Lora typography.** DM Mono for labels, metadata, and structural elements. Lora for body copy and headlines. The combination balances technical precision with warmth — the same balance good documentation tries to strike.

**Vanilla JavaScript interactions.** The homepage includes a typed text effect, scroll progress bar, card tilt and cursor gradient on portfolio cards, stagger reveal animations, and a counter animation on the activity strip. No libraries. No dependencies.

**Documentation audit widget.** A six-question interactive health check on the homepage generates a scored report across connectivity, architecture, and ownership. Built with a rule-based scoring engine. Direct entry point to the €300 Documentation Audit service.

**Interactive skills section.** Three tabbed panels — each one demonstrates a capability rather than listing it. A Docs-as-Code pipeline diagram, a clickable Diataxis quadrant grid, and a before/after API documentation toggle.

**Live CV as a Docs-as-Code artefact.** The `cv/` directory is a version-controlled CV deployed at `douglasebhoman.com/cv/`. It has a metrics strip, a changelog, and a PDF export. The CV is not a static file — it is a living document with a deployment pipeline.

**Documentation co-located with the codebase.** The `site-docs/` directory lives inside this repository. Documentation and the system it documents are version-controlled together so they stay in sync as the site evolves.

---

## Deployment

Triggered automatically on every push to `main`. GitHub's `pages-build-deployment` workflow serves the repository contents directly. No custom workflow file required. No build step. The repository contents are the deployment artefact.

The `CNAME` file maps the GitHub Pages URL to `douglasebhoman.com`.

---

## Blog

The `/blog` directory contains the *Systems Over Sentences* series, ten posts on documentation systems, Docs-as-Code workflows, and the thinking behind developer documentation.

Each post lives in its own folder with an `index.html` file for clean URLs. Comments are powered by [Giscus](https://giscus.app) using GitHub Discussions as the backend. The newsletter section on each post embeds a MailerLite form connected to a live welcome sequence.

**Note:** GitHub Discussions must be enabled on this repository for Giscus to function.

**Published posts:**

| # | Title | Published |
|---|-------|-----------|
| 01 | From Writing to Documentation Systems | Apr 8, 2026 |
| 02 | Your Documentation is a Bakery. Here's How to Build a Supermarket. | Apr 13, 2026 |
| 03 | How Product Teams Actually Handle Documentation | Apr 20, 2026 |
| 04 | Writing for Developers vs Non-Technical Users | Apr 27, 2026 |
| 05 | Anatomy of Great Documentation | May 3, 2026 |

---

## Portfolio

Seven live portfolio pieces, each demonstrating a specific documentation capability.

| # | Title | Type | Link |
|---|-------|------|------|
| 01 | Git & GitHub for Technical Writers | Six-part Docs-as-Code series | [Live site](https://douglasebhoman.github.io/git-github-for-technical-writers-series) |
| 02 | OpenWeather API: Getting Started Guide | API documentation | [Live docs](https://douglasebhoman.com/openweather-docs/) |
| 03 | Systems Over Sentences | 10-part blog series | [Live blog](https://douglasebhoman.com/blog) |
| 04 | Personal Website Setup Guide | How-to guide | [Hashnode](https://douglasebhoman.hashnode.dev/how-to-build-a-personal-website-with-a-custom-domain-and-professional-email) |
| 05 | Static Portfolio Architecture Review | Architecture documentation | [GitHub](https://github.com/Douglasebhoman/static-portfolio-site) |
| 06 | douglasebhoman.com: Site Documentation | Site documentation | [Live docs](https://douglasebhoman.github.io/site-docs/) |
| 07 | MkDocs for Technical Writers | 11-page documentation guide | [Live docs](https://douglasebhoman.com/mkdocs-for-technical-writers/) |

---

## Roadmap

In priority order:

**1. Personal Website Setup Guide as a live MkDocs site.**
Convert the existing Hashnode post into a structured MkDocs reference guide at `douglasebhoman.com/personal-website-setup-guide/`. Same treatment as the MkDocs for Technical Writers guide.

**2. Documentation audit API integration.**
Replace the rule-based scoring engine with a Cloudflare Worker proxy connecting to the Anthropic API. Every audit response becomes a personalised AI-generated report rather than a pre-written one.

**3. Blog migration to Eleventy.**
Migrate from hand-built HTML to Eleventy using the existing HTML as a layout template. Posts written in Markdown with frontmatter. Blog index and series pages generated automatically.

**4. Dark mode.**
A `prefers-color-scheme` media query on the CSS custom properties. The navy palette already works in dark contexts. This requires no new design work, only a CSS addition.

---

## Author

**Douglas Ebhoman** — Technical Writer based in Prague, Czechia.

Specialising in documentation systems, Docs-as-Code workflows, and developer-facing content for DevTools and SaaS companies.

[douglasebhoman.com/cv](https://douglasebhoman.com/cv) · [douglas@douglasebhoman.com](mailto:douglas@douglasebhoman.com) · Open to full-time and freelance engagements.