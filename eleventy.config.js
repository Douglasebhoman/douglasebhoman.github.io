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

  return {
    dir: {
      input: ".",
      output: "_site",
    },
  };
};
