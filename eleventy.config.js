module.exports = function (eleventyConfig) {
  // Passthrough copy — static assets and root-level files Eleventy would otherwise ignore
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("404.html");
  // Favicon files (add more extensions here if favicon assets are added later)
  eleventyConfig.addPassthroughCopy("*.ico");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.webmanifest");

  // Ignore build output and dependencies so Eleventy doesn't try to process them
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("_site/**");
  eleventyConfig.ignores.add("README.md");

  // ---------------------------------------------------------------
  // POSTS COLLECTION
  // Single source of truth for every "latest writing" surface:
  // the blog featured block, series strip, blog grid, and the
  // Work page writing strip all read from this and nothing else.
  //
  // A post joins the collection by having a `part` number in its
  // front matter. Set `draft: true` to hold one back.
  // ---------------------------------------------------------------
  const seriesPosts = (api) =>
    api
      .getFilteredByGlob("blog/posts/*/index.html")
      .filter((p) => p.data.part && p.data.draft !== true);

  // Newest first: featured block, blog grid, Work strip
  eleventyConfig.addCollection("posts", (api) =>
    seriesPosts(api).sort((a, b) => b.data.part - a.data.part)
  );

  // Oldest first: the series navigation strip
  eleventyConfig.addCollection("postsAsc", (api) =>
    seriesPosts(api).sort((a, b) => a.data.part - b.data.part)
  );

  // 7 -> "07"
  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));

  // Look up a post in a collection by its `part` number — used for
  // post-to-post prev/next navigation (see _includes/layouts/post.html)
  eleventyConfig.addFilter("findByPart", (list, n) =>
    (list || []).find((p) => p.data.part === n)
  );

  return {
    dir: {
      input: ".",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
  };
};
