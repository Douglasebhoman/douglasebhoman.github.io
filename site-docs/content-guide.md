# Content Guide

## Adding a blog post

### Folder and file structure

Each blog post lives in its own folder with an `index.html` file. The folder name becomes the URL slug.

```
blog/
└── posts/
    └── your-post-slug/
        └── index.html
```

Folder names must use lowercase letters and hyphens instead of spaces. The folder name must match the intended URL.

```
correct: anatomy-of-great-documentation
incorrect: Anatomy of Great Documentation
```

### Minimum HTML structure

Every post `index.html` must include the following sections in order.

**1. Navigation**

```html
<header class="nav-header" id="nav-header">
  <nav class="nav-container">
    <a href="/" class="nav-logo">
      <span class="nav-logo-name">Douglas Ebhoman</span>
      <span class="nav-logo-rule"></span>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="/#work"    class="nav-link">Work</a></li>
      <li><a href="/#about"   class="nav-link">About</a></li>
      <li><a href="/#skills"  class="nav-link">Skills</a></li>
      <li><a href="/#audit"   class="nav-link">Audit</a></li>
      <li><a href="/blog"     class="nav-link nav-link--active">Blog</a></li>
      <li><a href="/cv"       class="nav-link">CV</a></li>
      <li><a href="/#contact" class="nav-link">Contact</a></li>
    </ul>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle navigation" aria-expanded="false">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  </nav>
</header>
```

**2. Post hero**

```html
<section class="post-hero">
  <div class="post-hero-inner">
    <a href="/blog" class="post-back">← All posts</a>
    <span class="post-series-tag">Systems Over Sentences · Part ? of 10</span>
    <h1 class="post-title">Post Title</h1>
    <p class="post-subtitle">Subtitle</p>
    <div class="post-meta">
      <span class="post-meta-item">Douglas Ebhoman</span>
      <span class="post-meta-item">Published Month Day, Year</span>
      <span class="post-meta-item">X min read</span>
    </div>
  </div>
</section>
```

**3. Cover image**

```html
<div class="post-cover">
  <img
    src="../../../assets/images/post-slug-cover.png"
    width="1200"
    height="630"
    loading="eager"
  />
</div>
```

Cover image naming convention: `post-slug-cover.png`. Example: `anatomy-of-great-documentation-cover.png`.

**4. Post body**

```html
<div class="post-body-wrap">
  <article class="post-body">
    <!-- Post content here -->
  </article>
</div>
```

**5. Series navigation**

For posts that are not the last in the series:

```html
<nav class="series-nav">
  <a href="/blog" class="series-nav-link">← All posts</a>
  <a href="/blog/posts/next-post-slug/" class="series-nav-link series-nav-link--next">Part ?: Next Post Title →</a>
</nav>
```

For the last post in the series, omit the next link:

```html
<nav class="series-nav">
  <a href="/blog" class="series-nav-link">← All posts</a>
</nav>
```

**6. Comments**

```html
<section class="comments-section">
  <p class="comments-label">Discussion</p>
  <script src="https://giscus.app/client.js"
    data-repo="Douglasebhoman/douglasebhoman.github.io"
    data-repo-id="R_kgDORhvuTg"
    data-category="Announcements"
    data-category-id="DIC_kwDORhvuTs4C53Ys"
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="bottom"
    data-theme="preferred_color_scheme"
    data-lang="en"
    data-loading="lazy"
    crossorigin="anonymous"
    async>
  </script>
</section>
```

**7. Newsletter**

```html
<section class="post-newsletter">
  <div class="post-newsletter-inner">
    <div>
      <p class="post-newsletter-label">Newsletter</p>
      <p class="post-newsletter-desc">
        One post a week on how documentation actually works.<br>No spam. Unsubscribe anytime.
      </p>
    </div>
    <script>
      (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
      .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
      n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
      (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
      ml('account', '2241731');
    </script>
    <div class="ml-embedded" data-form="8iCjwu" style="width: 100%;"></div>
  </div>
</section>
```

**8. Footer**

```html
<footer class="post-footer">
  <div class="post-footer-inner">
    <p class="post-footer-text">© 2026 Douglas Ebhoman · Documentation is infrastructure. I treat it that way.</p>
    <a href="/blog" class="post-footer-link">← Back to blog</a>
  </div>
</footer>
```

---

## Updating the blog index

After creating the post folder and file, update `blog/index.html` manually in VS Code. Add the new post card to the blog index. Push to main. The live site updates automatically.

---

## Updating the CV page

The CV page lives at `cv/index.html`. It is a standalone HTML file with its own inline styles and no dependency on `styles.css`.

To update CV content, edit `cv/index.html` directly. To update the downloadable PDF, replace `assets/files/Douglas_Ebhoman_CV.pdf` and push.

The changelog section in `cv/index.html` should be updated with a new entry whenever a significant change is made to the CV.

---

## Updating the homepage

The homepage is `index.html` in the repository root. All sections are inline. Page-specific styles are in the `<style>` block in `<head>`. JavaScript interactions are in the `<script>` block before `</body>`.

When adding a new portfolio card, follow the existing card structure and increment the card number. Update the activity strip counter if the portfolio count changes.