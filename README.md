# douglasebhoman.com

Personal website and portfolio of Douglas Ebhoman, a Technical Writer and Docs-as-Code practitioner based in Prague, Czechia.

**Live site:** [douglasebhoman.com](https://douglasebhoman.com)

---

## Overview

This repository is the source for my personal website, portfolio, and blog. It is hand-built in HTML and CSS with no frameworks, no static site generators, and no dependencies. It deploys automatically to GitHub Pages on every push to `main`.

The site itself is a proof of work. A technical writer who specialises in Docs-as-Code and advocates for documentation as infrastructure should be able to build, version-control, and deploy their own web presence using the same principles they apply to documentation systems. This repository is that argument made concrete.

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
│       └── writing-for-developers-vs-non-technical-users/
│           └── index.html
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

**No framework.** Every line of HTML and CSS is written by hand. This was a deliberate choice, not because frameworks are wrong, but because building without them forces a precise understanding of how the web actually works. For a technical writer who teaches Git-based workflows, the site infrastructure should be as transparent as the documentation it supports.

**Static only.** No server, no database, no build step beyond deployment. All pages are plain HTML files sharing a single `styles.css`. This keeps the security surface area minimal, the deployment pipeline simple, and the maintenance overhead close to zero.

**GitHub Pages and Cloudflare.** The site is hosted on GitHub Pages and served through a custom domain registered and DNS-managed via Cloudflare. HTTPS is handled automatically by GitHub via Let's Encrypt. All DNS records are set to DNS-only with no Cloudflare proxy, to allow GitHub's certificate issuance to work correctly.

**Navy, gold, silver palette.** The colour palette uses `#18222C` navy, `#A68959` gold, and `#B8C0CC` silver. These were chosen to signal precision and authority without the clinical sterility of pure black and white. Gold as the accent colour communicates craft and intentionality.

**DM Mono and Lora typography.** DM Mono is used for labels, metadata, and structural elements. It signals technical precision. Lora is used for body copy and headlines. It brings warmth and readability to long-form content. The combination balances the technical and the human, which is the same balance good documentation tries to strike.

**Scroll animations.** Entry animations on scroll use the Intersection Observer API with CSS transitions and no JavaScript animation libraries. Each section reveals on scroll with a configurable delay, keeping the page feel dynamic without sacrificing performance.

**Pulsing availability indicator.** The availability status in the About section and the activity strip both use a CSS keyframe animation. A small pulsing gold dot signals open to work. It updates by editing one line of HTML.

**Documentation co-located with the codebase.** The `site-docs/` directory lives inside this repository rather than separately. This is a deliberate Docs-as-Code decision. Documentation and the system it documents are version-controlled together, so they stay in sync as the site evolves.

---

## Deployment

Deployment is handled by GitHub's built-in Pages deployment, triggered automatically on every push to `main`. No custom workflow file is required. GitHub detects the push and serves the contents of `main` directly as the live site via the `pages-build-deployment` workflow.

The `CNAME` file in the root maps the GitHub Pages URL to the custom domain `douglasebhoman.com`.

No build step is required. The repository contents are the deployment artefact.

---

## Blog

The `/blog` directory contains a hand-built blog section for the *Systems Over Sentences* series, ten posts on documentation systems, Docs-as-Code workflows, and the thinking behind developer documentation.

Each post lives in its own folder with an `index.html` file to enable clean URLs. Comments are handled by [Giscus](https://giscus.app), a GitHub Discussions-backed comment system that requires no database. Note: GitHub Discussions must be enabled on this repository for Giscus to function. The newsletter section on each post embeds a MailerLite form connected to a live welcome sequence.

**Published posts:**

| # | Title | Published |
|---|-------|-----------|
| 01 | From Writing to Documentation Systems | Apr 8, 2026 |
| 02 | Your Documentation is a Bakery. Here's How to Build a Supermarket. | Apr 13, 2026 |
| 03 | How Product Teams Actually Handle Documentation | Apr 20, 2026 |
| 04 | Writing for Developers vs Non-Technical Users | Apr 27, 2026 |

---

## Portfolio pieces

The Work section currently features seven portfolio pieces:

| # | Title | Type | Link |
|---|-------|------|------|
| 01 | Git & GitHub for Technical Writers | Six-part series | [Live site](https://douglasebhoman.github.io/git-github-for-technical-writers-series) |
| 02 | OpenWeather API — Getting Started Guide | API documentation | [Live docs](https://douglasebhoman.com/openweather-docs/) |
| 03 | Systems Over Sentences | Blog series | [douglasebhoman.com/blog](https://douglasebhoman.com/blog) |
| 04 | Personal Website Setup Guide | How-to guide | [Hashnode](https://douglasebhoman.hashnode.dev/how-to-build-a-personal-website-with-a-custom-domain-and-professional-email) |
| 05 | Static Portfolio Architecture Review | Architecture documentation | [GitHub](https://github.com/Douglasebhoman/static-portfolio-site) |
| 06 | douglasebhoman.com Site Documentation | Site documentation | [Live docs](https://douglasebhoman.github.io/site-docs/) |
| 07 | MkDocs for Technical Writers | Documentation guide | [Live docs](https://douglasebhoman.com/mkdocs-for-technical-writers/) |

---

## What I would add next

**Personal Website Setup Guide as a live MkDocs site.** The current guide lives as a Hashnode blog post and a GitHub repository. The next planned addition is converting it into a structured MkDocs reference guide deployed at `douglasebhoman.com/personal-website-setup-guide/`.

**Blog migration to Eleventy.** The current blog is hand-built HTML. Migrating to Eleventy would use the existing HTML as a layout template with posts written in Markdown and frontmatter, generating the blog index, series pages, and individual post pages automatically.

**Dark mode.** The navy palette already works well in dark contexts. A `prefers-color-scheme` media query on the CSS custom properties will enable full dark mode support without a separate stylesheet.

---

## Author

**Douglas Ebhoman**
Technical Writer — [douglasebhoman.com](https://douglasebhoman.com)
Open to full-time roles and freelance engagements with engineering teams building products that documentation should be proud of.

---

> Documentation is infrastructure. I treat it that way.