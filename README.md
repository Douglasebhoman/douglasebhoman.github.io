# douglasebhoman.com

Portfolio, blog, and live CV for Douglas Ebhoman, a documentation systems specialist based in Prague. The site serves three audiences: engineering teams evaluating a freelance documentation engagement, hiring managers reviewing a technical writer candidate, and technical writers looking for content on documentation architecture and Docs-as-Code workflows. It is built in pure HTML, CSS, and vanilla JavaScript with no build process or framework dependencies — the repository contents are the deployment artefact.

---

## Site structure

| URL | Page | Contents |
|-----|------|----------|
| `/` | Homepage | Hero, scrolling ticker, documentation health check widget, selected portfolio, writing samples (tabbed), Documentation Audit service, process steps, social proof, final CTA, newsletter signup |
| `/work/` | Portfolio | Full grid of six documentation portfolio pieces with filter bar, writing preview strip |
| `/services/` | Services | Documentation Audit — full detail on the €300, five-working-day audit service, pricing, FAQ |
| `/blog/` | Blog index | Systems Over Sentences series — featured article, series navigation strip, full article grid, newsletter |
| `/blog/posts/from-writing-to-documentation-systems/` | Post — Part 01 | From Writing to Documentation Systems |
| `/blog/posts/your-documentation-is-a-bakery/` | Post — Part 02 | Your Documentation is a Bakery |
| `/blog/posts/how-product-teams-actually-handle-documentation/` | Post — Part 03 | How Product Teams Actually Handle Documentation |
| `/blog/posts/writing-for-developers-vs-non-technical-users/` | Post — Part 04 | Writing for Developers vs Non-Technical Users |
| `/blog/posts/anatomy-of-great-documentation/` | Post — Part 05 | Anatomy of Great Documentation |
| `/cv/` | CV | Version-controlled live CV: metrics strip, two-column layout with sticky sidebar, outcome-led portfolio entries, changelog, PDF download |
| `/404.html` | 404 | Custom error page with navigation back to the homepage |

### Supporting files

| File / directory | Purpose |
|-----------------|---------|
| `styles.css` | Global stylesheet shared across all pages |
| `assets/images/` | All site images: portfolio cards, blog post covers, headshots |
| `assets/files/Douglas_Ebhoman_CV.pdf` | Downloadable CV linked from the CV page and contact section |
| `site-docs/` | Internal documentation: architecture, deployment, content guide, contributing |
| `CNAME` | Custom domain record for GitHub Pages (`douglasebhoman.com`) |
| `sitemap.xml` | XML sitemap for search engine indexing |
| `robots.txt` | Crawler directives |
| `.nojekyll` | Prevents GitHub Pages from running Jekyll on the repository |

---

## Technology stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styles | CSS3 — custom properties, Grid, Flexbox, `clamp()`, multi-column layout, CSS animations |
| Scripts | Vanilla JavaScript — no frameworks or libraries |
| Hosting | GitHub Pages, served directly from `main` |
| DNS | Cloudflare — DNS-only mode (no proxy), CNAME pointing to `douglasebhoman.github.io` |
| HTTPS | Let's Encrypt via GitHub Pages automatic certificate issuance |
| Fonts | Google Fonts — Fraunces, DM Sans, DM Mono (CV page: Lora, DM Mono) |
| Comments | [Giscus](https://giscus.app) — GitHub Discussions as comment backend on all blog posts |
| Newsletter | [MailerLite](https://www.mailerlite.com) — embedded form widget (account `2241731`, form `8iCjwu`) |
| Booking | [Calendly](https://calendly.com/douglas-douglasebhoman/30min) — booking link for the Documentation Audit |

### Vanilla JavaScript interactions (homepage)

All interactions live in a single `<script>` block at the bottom of `index.html`.

| Interaction | Description |
|-------------|-------------|
| Particle network canvas | Animated gold particle field on the hero section |
| Cursor trail | Gold particles follow the cursor |
| Scrolling ticker | CSS marquee animation, duplicated content for seamless looping |
| Social proof carousel | Auto-rotating three-item carousel with dot indicators, 4 s per item |
| Scroll-progress bar | Gold bar across the top of the viewport tracking scroll depth |
| Scroll reveals | IntersectionObserver fades elements up as they enter the viewport |
| Animated counters | Stat numbers count up when visible |
| Typewriter effect | Cycles through three code snippets in the hero |
| Command palette | Opens with ⌘K / Ctrl+K, searches portfolio and navigation |
| Documentation health check | Six-question scoring engine — produces a scored report across accuracy, ownership, and findability |
| Mobile hamburger nav | Present on all pages |
| Smooth anchor scroll | Custom eased scroll for in-page links |

---

## Deployment

The site deploys automatically on every push to `main`. There is no build step — GitHub Pages serves the repository contents directly as static files.

### Flow

1. Push or merge to `main`
2. GitHub's built-in `pages-build-deployment` workflow triggers automatically
3. Files are served as-is — no compilation, no preprocessing
4. Live at `douglasebhoman.com` within one to two minutes

### Custom domain setup

| Step | Detail |
|------|--------|
| `CNAME` file | Declares `douglasebhoman.com` as the custom domain |
| Cloudflare DNS | CNAME record: `douglasebhoman.com` → `douglasebhoman.github.io`, DNS-only (proxy disabled) |
| GitHub Pages settings | Custom domain confirmed in repository settings |
| HTTPS | Issued automatically by GitHub via Let's Encrypt — no manual certificate management |

Cloudflare proxy must remain disabled. Enabling it breaks GitHub's Let's Encrypt certificate issuance.

### Verifying a deployment

After pushing, open the **Actions** tab in the repository. The `pages-build-deployment` workflow shows a green checkmark when the deployment completes successfully.

---

## Blog series: Systems Over Sentences

*Systems Over Sentences* is a 10-part series on documentation architecture, ownership, and craft for DevTools and SaaS teams. Five parts are published.

| Part | Title | Date |
|------|-------|------|
| 01 | [From Writing to Documentation Systems](https://douglasebhoman.com/blog/posts/from-writing-to-documentation-systems/) | April 8, 2026 |
| 02 | [Your Documentation is a Bakery. Here's How to Build a Supermarket.](https://douglasebhoman.com/blog/posts/your-documentation-is-a-bakery/) | April 13, 2026 |
| 03 | [How Product Teams Actually Handle Documentation](https://douglasebhoman.com/blog/posts/how-product-teams-actually-handle-documentation/) | April 20, 2026 |
| 04 | [Writing for Developers vs Non-Technical Users](https://douglasebhoman.com/blog/posts/writing-for-developers-vs-non-technical-users/) | April 27, 2026 |
| 05 | [Anatomy of Great Documentation](https://douglasebhoman.com/blog/posts/anatomy-of-great-documentation/) | May 3, 2026 |
| 06–10 | *In progress* | — |

Each post is self-contained and part of a connected series. Every post includes a part-navigation strip, related posts section, Giscus comment thread, and newsletter signup. Open Graph and Twitter Card meta tags are set on all five posts.

---

## Design system

### Colour palette

| Token | Hex / value | Usage |
|-------|-------------|-------|
| `--navy` | `#18222C` | Primary dark background, nav, footer |
| `--navy-mid` | `#1E2D3D` | Secondary dark surface |
| `--navy-light` | `#243044` | Tertiary dark surface |
| `--cream` | `#F9F7F4` | Primary light background |
| `--cream-2` | `#F2EFE9` | Secondary light surface |
| `--gold` | `#B8962E` | Primary accent — CTAs, active states, labels, borders |
| `--gold-light` | `#D4B060` | Hover / highlight variant of gold |
| `--gold-subtle` | `rgba(184,150,46,0.08)` | Gold-tinted fill |
| `--gold-border` | `rgba(184,150,46,0.20)` | Gold-tinted border |
| `--text-dark` | `#111827` | Primary body text on light backgrounds |
| `--text-mid` | `#4B5563` | Secondary body text |
| `--text-muted` | `#9CA3AF` | De-emphasised / tertiary text |
| `--green` | `#4ADE80` | Availability indicator |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--serif` | `'Fraunces', Georgia, serif` | Headlines, pull quotes, drop caps, blog body text |
| `--sans` | `'DM Sans', system-ui, sans-serif` | Body text, UI copy |
| `--mono` | `'DM Mono', monospace` | Labels, tags, metadata, navigation, code samples |

The CV page loads **Lora** and **DM Mono** separately via its own `<link>` tag.

### Layout variables

| Token | Value | Purpose |
|-------|-------|---------|
| `--container` | `960px` | Maximum content width |
| `--pad` | `clamp(24px, 5vw, 48px)` | Responsive horizontal section padding |
| `--fast` | `0.15s ease` | Quick UI transitions (hover states) |
| `--base` | `0.25s ease` | Standard transitions (cards, panels) |

### CSS conventions

- `box-sizing: border-box` applied universally via `*`
- `img { display:block; max-width:100%; height:auto; }` as a global reset in `styles.css`
- Page-specific styles live in a `<style>` block in each page's `<head>` — no per-page CSS files
- Scroll reveal: `.reveal` elements gain `.visible` via IntersectionObserver, triggering `translateY` + `opacity` transition
- Focus ring: `outline: 2px solid var(--gold); outline-offset: 3px` on all interactive elements via `:focus-visible`
- Responsive breakpoints: `768px` (tablet/mobile), `480px` (small mobile), `600px` (some grid collapses)

---

## Contact and booking

| | |
|--|--|
| **Book the Documentation Audit** | [calendly.com/douglas-douglasebhoman/30min](https://calendly.com/douglas-douglasebhoman/30min) |
| **Email** | douglas@douglasebhoman.com |
| **LinkedIn** | [linkedin.com/in/douglas-ebhoman-757329289](https://linkedin.com/in/douglas-ebhoman-757329289) |
| **GitHub** | [github.com/Douglasebhoman](https://github.com/Douglasebhoman) |

The Documentation Audit is a fixed-fee service: €300, delivered in five working days. It covers accuracy, architecture, ownership, and findability across the client's documentation system, with a written report and a 30-minute walkthrough call.
