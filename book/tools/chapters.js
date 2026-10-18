// Where chapters and their posts are, derived from file names and post data,
// never from a chapter's own front matter. A chapter's front matter is output,
// so a check that read it back would regenerate a wrong value and pass.
//
//   book/<part>/NN-<slug>.md   is chapter NN, generated from
//   blog/posts/<slug>/index.html
//
// A series post is a post with a numeric `part` that is not a draft: the same
// rule the site uses for its listings (eleventy.config.js). Each one needs a
// chapter named after its part number and slug, in any book/part-* folder.

const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");

const root = path.resolve(__dirname, "..", "..");
const NAME = /^(\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;

function listChapters() {
  const bookDir = path.join(root, "book");
  return fs.readdirSync(bookDir).filter((d) => /^part-/.test(d)).sort()
    .flatMap((d) => fs.readdirSync(path.join(bookDir, d)).filter((f) => f.endsWith(".md")).sort().map((f) => {
      const file = `book/${d}/${f}`;
      const m = NAME.exec(f);
      if (!m) return { file, error: `file name is not NN-slug.md` };
      return { file, number: Number(m[1]), slug: m[2], source: `blog/posts/${m[2]}/index.html` };
    }));
}

function seriesPosts() {
  const dir = path.join(root, "blog", "posts");
  return fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, "index.html"))).sort()
    .map((slug) => ({ slug, source: `blog/posts/${slug}/index.html`, data: matter(fs.readFileSync(path.join(dir, slug, "index.html"), "utf8")).data }))
    .filter((p) => Number.isInteger(p.data.part) && p.data.draft !== true)
    .map((p) => ({ slug: p.slug, source: p.source, part: p.data.part, expected: `${String(p.data.part).padStart(2, "0")}-${p.slug}.md` }));
}

module.exports = { root, listChapters, seriesPosts };
