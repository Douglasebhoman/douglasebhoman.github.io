# douglasebhoman.com

Professional web presence and freelance practice for Douglas Ebhoman,
a documentation systems specialist based in Prague. Built with HTML, CSS
and vanilla JavaScript, and Eleventy 3, with no front-end framework and no
CMS. A GitHub Actions workflow builds the site into `_site/` and deploys that
output to GitHub Pages.

---

## Site structure

| URL | Page | Purpose |
| --- | --- | --- |
| `/` | Homepage | Hero, health check widget, selected work, writing samples, documentation audit service, process steps, social proof, final CTA, newsletter |
| `/work/` | Work | Full grid of documentation portfolio pieces |
| `/services/` | Services | Documentation Audit — €300 fixed-fee service, deliverables, FAQ |
| `/audit/` | Audit | Standalone audit booking page with Calendly embed |
| `/blog/` | Blog index | Systems Over Sentences series — article grid and newsletter |
| `/blog/posts/from-writing-to-documentation-systems/` | Post 01 | From Writing to Documentation Systems |
| `/blog/posts/your-documentation-is-a-bakery/` | Post 02 | Your Documentation is a Bakery. Here's How to Build a Supermarket. |
| `/blog/posts/how-product-teams-actually-handle-documentation/` | Post 03 | How Product Teams Actually Handle Documentation (And Why It Usually Fails) |
| `/blog/posts/writing-for-developers-vs-non-technical-users/` | Post 04 | Writing for Developers vs Non-Technical Users: Why the Difference Matters |
| `/blog/posts/anatomy-of-great-documentation/` | Post 05 | The Anatomy of Great Documentation |
| `/blog/posts/introduction-to-structured-writing/` | Post 06 | Introduction to Structured Writing |
| `/404.html` | 404 | Custom error page with navigation back to the homepage |

### Supporting files

| File / directory | Purpose |
| --- | --- |
| `styles.css` | Global stylesheet shared across all pages |
| `assets/images/` | All site images — portfolio cards, blog post covers, headshots |
| `CNAME` | Custom domain record for GitHub Pages (`douglasebhoman.com`) |
| `sitemap.njk` | Generates `/sitemap.xml`. Blog post entries come from the posts collection. Other entries are written by hand |
| `eleventy.config.js` | Eleventy configuration: copied files, ignored files and the posts collections |
| `_includes/layouts/post.html` | Shared layout for every blog post |
| `.github/workflows/deploy.yml` | Builds the site and deploys it to GitHub Pages |
| `robots.txt` | Crawler directives |
| `.nojekyll` | Prevents GitHub Pages from running Jekyll on the repository |

---

## Technology stack

| Layer | Technology |
| --- | --- |
| Markup | HTML5 |
| Styles | CSS3 — custom properties, Grid, Flexbox, `clamp()`, multi-column layout, CSS animations |
| Scripts | Vanilla JavaScript — no frameworks or libraries |
| Build | Eleventy 3.1.6 on Node 22 |
| Hosting | GitHub Pages, deployed by GitHub Actions on every push to `main` |
| DNS | Cloudflare — DNS-only mode (no proxy), CNAME pointing to `douglasebhoman.github.io` |
| HTTPS | Let's Encrypt via GitHub Pages automatic certificate issuance |
| Fonts | Google Fonts — Fraunces, DM Sans, DM Mono |
| Comments | Giscus — GitHub Discussions as comment backend on all blog posts |
| Newsletter | MailerLite — embedded form widget |
| Booking | Calendly — booking link for the Documentation Audit |

### Vanilla JavaScript interactions (homepage)

All interactions live in a single `<script>` block before `</body>` in
`index.html`. For full documentation of each interaction, see
[site-docs/JavaScript](https://douglasebhoman.com/site-docs/javascript/).

| Interaction | Description |
| --- | --- |
| Particle network canvas | Animated gold particle field on the hero section — pauses when out of view |
| Cursor trail | Gold particles follow the cursor, appended directly to `document.body` |
| Scrolling gold strip | Pure CSS animation — no JavaScript involved |
| Scroll progress bar | Gold bar across the top of the viewport tracking scroll depth |
| Nav scroll state | Nav gains `scrolled` class after 40px scroll, triggering shadow |
| Ambient orb animation | Three blurred gold gradients animate on a sine-wave path |
| Scroll reveals | `IntersectionObserver` fades `.reveal` elements up as they enter the viewport |
| Animated counters | Stat numbers count up when visible — runs once per element |
| Typewriter effect | Cycles through three code snippets in the hero panel |
| Social proof carousel | Auto-rotating three-item carousel with dot indicators, 4s per item |
| Documentation health check | Six-question scoring engine — accuracy, ownership, findability dimensions |
| Command palette | Opens with ⌘K / Ctrl+K, live text search across portfolio and navigation |
| Hamburger navigation | Mobile nav — toggles `open` class, closes on outside click |
| Smooth anchor scroll | Custom quartic ease-out scroll for all `href="#"` links |
| Writing samples tabs | Four tabbed panels — `switchTab()` called via `onclick` |

---

## Deployment

Every push to `main` runs the **Build and Deploy to GitHub Pages** workflow
in `.github/workflows/deploy.yml`. Only the build output is published.

### Flow

1. Push or merge to `main`
2. The workflow installs dependencies with `npm ci` on Node 22
3. Eleventy builds the site into `_site/`
4. The workflow uploads `_site/` and deploys it to GitHub Pages
5. Live at `douglasebhoman.com`, usually within a minute or two

The Pages source in the repository settings must be **GitHub Actions**.

### Custom domain setup

| Step | Detail |
| --- | --- |
| `CNAME` file | Declares `douglasebhoman.com` as the custom domain |
| Cloudflare DNS | CNAME record: `douglasebhoman.com` → `douglasebhoman.github.io`, DNS-only, proxy disabled |
| GitHub Pages settings | Custom domain confirmed in repository settings |
| HTTPS | Issued automatically by GitHub via Let's Encrypt |

**Cloudflare proxy must remain disabled.** Enabling it breaks GitHub's
Let's Encrypt certificate issuance.

### Verifying a deployment

After pushing, open the **Actions** tab in the repository. The
**Build and Deploy to GitHub Pages** run shows a green tick on both jobs,
`build` and `deploy`, when the deployment completes successfully.

The site documentation is maintained in the separate
[site-docs](https://github.com/Douglasebhoman/site-docs) repository and
served at [douglasebhoman.com/site-docs](https://douglasebhoman.com/site-docs/).

---

## Blog series: Systems Over Sentences

*Systems Over Sentences* is a 10-part series on documentation
architecture, ownership, and craft for DevTools and SaaS teams.

The current list of published posts is on the blog: [douglasebhoman.com/blog](https://douglasebhoman.com/blog/).

Each post is self-contained and part of a connected series. Every post
includes a series navigation strip, a Giscus comment thread, and a
newsletter signup. Open Graph and Twitter Card meta tags are set on all
published posts.

---

## Design system

### Colour palette

| Token | Value | Usage |
| --- | --- | --- |
| `--navy` | `#18222C` | Primary dark background, nav, footer |
| `--navy-mid` | `#1E2D3D` | Secondary dark surface |
| `--navy-light` | `#243044` | Tertiary dark surface |
| `--cream` | `#F9F7F4` | Primary light background |
| `--cream-2` | `#F2EFE9` | Secondary light surface |
| `--white` | `#FFFFFF` | Pure white |
| `--gold` | `#B8962E` | Primary accent — CTAs, labels, borders |
| `--gold-light` | `#D4B060` | Hover and highlight variant |
| `--gold-subtle` | `rgba(184,150,46,0.08)` | Gold-tinted fill |
| `--gold-border` | `rgba(184,150,46,0.20)` | Gold-tinted border |
| `--text-dark` | `#111827` | Primary body text on light backgrounds |
| `--text-mid` | `#4B5563` | Secondary body text |
| `--text-muted` | `#9CA3AF` | De-emphasised text |
| `--text-dim` | `rgba(255,255,255,0.45)` | Dimmed white text on dark backgrounds |
| `--text-ghost` | `rgba(255,255,255,0.25)` | Ghost white text on dark backgrounds |
| `--border-light` | `rgba(0,0,0,0.08)` | Subtle border on light surfaces |
| `--border-dark` | `rgba(255,255,255,0.06)` | Subtle border on dark surfaces |
| `--green` | `#4ADE80` | Availability indicator |

### Typography

| Token | Value | Usage |
| --- | --- | --- |
| `--serif` | `'Fraunces', Georgia, serif` | Headlines, pull quotes, drop caps, blog body |
| `--sans` | `'DM Sans', system-ui, sans-serif` | Body text, UI copy |
| `--mono` | `'DM Mono', monospace` | Labels, tags, metadata, navigation, code |

### Layout tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--container` | `960px` | Maximum content width |
| `--pad` | `clamp(24px, 5vw, 48px)` | Responsive horizontal section padding |
| `--fast` | `0.15s ease` | Quick transitions — hover states |
| `--base` | `0.25s ease` | Standard transitions — cards, panels |

### CSS conventions

- `box-sizing: border-box` applied universally via `*`
- `img { display: block; max-width: 100%; height: auto; }` global reset in `styles.css`
- Page-specific styles live in a `<style>` block in each page's `<head>`
- Global styles that apply across all pages live in `styles.css`
- Scroll reveal: `.reveal` elements gain `.visible` via `IntersectionObserver`
- Focus ring: `outline: 2px solid var(--gold); outline-offset: 3px` on all interactive elements via `:focus-visible`
- Responsive breakpoints: `768px` (mobile), `600px` (contact grid collapse), `480px` (small mobile)

---

## Contact and booking

| | |
| --- | --- |
| **Book the Documentation Audit** | [calendly.com/douglas-douglasebhoman/30min](https://calendly.com/douglas-douglasebhoman/30min) |
| **Email** | douglas@douglasebhoman.com |
| **LinkedIn** | [linkedin.com/in/douglas-ebhoman](https://linkedin.com/in/douglas-ebhoman-757329289) |
| **GitHub** | [github.com/Douglasebhoman](https://github.com/Douglasebhoman) |

The Documentation Audit is a fixed-fee service: €300, delivered in five
working days. It covers accuracy, ownership, and findability across the
client's documentation system, with a written report and a 30-minute
walkthrough call.