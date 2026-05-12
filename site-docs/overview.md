# douglasebhoman.com

A static portfolio website built in pure HTML, CSS, and JavaScript, hosted on GitHub, and deployed via GitHub Pages.

## Project details

| Property | Value |
|----------|-------|
| GitHub repo | https://github.com/Douglasebhoman/douglasebhoman.github.io |
| Tech stack | HTML, CSS, JavaScript |
| Build tools | None |
| Deployment trigger | Push to main |
| Live site | https://douglasebhoman.com |
| Live CV | https://douglasebhoman.com/cv/ |

## What the site contains

The site is a portfolio, blog, and live CV for Douglas Ebhoman, a technical writer based in Prague. It serves three audiences simultaneously: hiring managers evaluating a candidate, engineering teams considering a freelance engagement, and technical writers looking for documentation systems content.

**Homepage sections:**

- Hero with typed text effect and scroll-triggered animations
- Activity strip with animated counters
- Portfolio — seven live documentation pieces
- About section
- Social proof
- Skills — three interactive tabbed panels demonstrating Documentation Systems, Information Architecture, and Developer-Facing Content
- Documentation Audit — a six-question interactive health check generating a scored report across connectivity, architecture, and ownership
- Contact — availability status, direct links, and an audit funnel prompt

**Additional pages:**

- `/blog` — Systems Over Sentences, a 10-part series on documentation systems. Five parts published.
- `/cv/` — a version-controlled live CV with metrics strip, two-column layout, changelog, and PDF download

## Dependencies

### Fonts

- Provider: Google Fonts
- Families: DM Mono, Lora
- Loading method: CDN via `<head>`

### Newsletter

- Provider: MailerLite (Growing Business plan)
- Script: Universal embed
- Account ID: `2241731`
- Form ID: `8iCjwu`
- Domain authentication: configured via Cloudflare DNS
- Welcome sequence: two-email automation active

### Comments

- Provider: Giscus
- Backend: GitHub Discussions on `douglasebhoman.github.io`
- Repo ID: `R_kgDORhvuTg`
- Category ID: `DIC_kwDORhvuTs4C53Ys`
- Requires: GitHub Discussions enabled on the repository

### Documentation audit widget

- Type: Rule-based scoring engine
- Questions: Six
- Output: Score, category label, three health bars, five report sections
- Planned upgrade: Cloudflare Worker proxy connecting to Anthropic API for AI-generated reports

## Deployment

Triggered automatically on push to `main` via GitHub Actions, deployed to GitHub Pages. No build step. The repository contents are the deployment artefact.