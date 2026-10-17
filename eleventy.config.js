const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Passthrough copy — static assets and root-level files Eleventy would otherwise ignore
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy("robots.txt");
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
  eleventyConfig.ignores.add("CLAUDE.md");
  // Share card sources, rendered to PNG by hand and never published
  eleventyConfig.ignores.add("scripts/**");
  // Book source: Markdown chapters derived from the posts. They live here so a
  // post and its chapter can share a commit, but they are not part of the site.
  eleventyConfig.ignores.add("book/**");

  // ---------------------------------------------------------------
  // DRAFTS
  // A file with `draft: true` is skipped entirely in production
  // builds (`npm run build` and the deploy workflow), so it is never
  // written to _site and has no public URL. Under `npm start`
  // (eleventy --serve) it still renders locally for review.
  // ---------------------------------------------------------------
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

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

  // ---------------------------------------------------------------
  // SERIES
  // The series name, total and blog URL are written once, in
  // blog/posts/posts.json. That file is directory data, so only the
  // posts can see it. This publishes the same object to every page,
  // so the blog index and the Work page read it rather than repeating
  // it. The file is read on every build, so editing it needs no restart.
  // ---------------------------------------------------------------
  eleventyConfig.addGlobalData("series", () =>
    JSON.parse(fs.readFileSync(path.join(__dirname, "blog/posts/posts.json"), "utf8")).series
  );

  // 7 -> "07"
  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"));

  // Look up a post in a collection by its `part` number — used for
  // post-to-post prev/next navigation (see _includes/layouts/post.html)
  eleventyConfig.addFilter("findByPart", (list, n) =>
    (list || []).find((p) => p.data.part === n)
  );

  // ---------------------------------------------------------------
  // STRUCTURED DATA (see _includes/partials/post-jsonld.njk)
  // ---------------------------------------------------------------

  // "October 4, 2026" -> "2026-10-04". Strict: anything else fails
  // the build rather than publishing a wrong or empty date.
  const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  eleventyConfig.addFilter("isoDate", (s) => {
    const m = /^([A-Z][a-z]+) (\d{1,2}), (\d{4})$/.exec(String(s));
    const month = m ? MONTHS.indexOf(m[1]) + 1 : 0;
    const day = m ? Number(m[2]) : 0;
    const year = m ? Number(m[3]) : 0;
    const valid = month > 0 && day >= 1 &&
      day <= new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (!valid) throw new Error(`isoDate: cannot parse publishDate "${s}"`);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  });

  // A string as a JSON literal for a <script type="application/ld+json">
  // block. HTML entities are not decoded inside a script element, so a
  // value containing one fails the build instead of shipping "&rsquo;"
  // to search engines. "<" is escaped so "</script>" cannot end the block.
  eleventyConfig.addFilter("jsonString", (s) => {
    if (typeof s !== "string") throw new Error(`jsonString: expected a string, got ${JSON.stringify(s)}`);
    if (/&(#\d+|#x[0-9a-f]+|[a-z][a-z0-9]*);/i.test(s)) {
      throw new Error(`jsonString: HTML entity in structured data value "${s}"`);
    }
    return JSON.stringify(s).replace(/</g, "\\u003c");
  });

  return {
    dir: {
      input: ".",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
  };
};
