#!/usr/bin/env node
// Report every chapter whose source post has changed since it was converted.
//
//   node book/tools/stale.js
//
// Each chapter records `source` (the post path) and `source_commit` (the last
// commit that changed the post when the chapter was converted). A chapter is
// stale when the post's last commit is no longer that commit. The check exits
// non-zero when any chapter is stale, or when it cannot tell.
//
// Because source_commit names the post's own last commit, a post change and its
// reconverted chapter cannot be the same commit: commit the post, then run
// convert.js and commit the chapter.
//
// It needs full git history. On a shallow clone `git log -- <path>` cannot see a
// post's last commit, so the check refuses to run rather than pass.

const path = require("path");
const fs = require("fs");
const cp = require("child_process");
const matter = require("gray-matter");
const root = path.resolve(__dirname, "..", "..");
const git = (...args) => cp.execFileSync("git", ["-C", root, ...args]).toString().trim();

if (git("rev-parse", "--is-shallow-repository") === "true") {
  console.error("stale.js: this is a shallow clone, so post history is incomplete. Fetch full history (actions/checkout with fetch-depth: 0).");
  process.exit(2);
}

const bookDir = path.join(root, "book");
const chapters = fs.readdirSync(bookDir).filter((d) => /^part-/.test(d)).sort()
  .flatMap((d) => fs.readdirSync(path.join(bookDir, d)).filter((f) => f.endsWith(".md")).sort().map((f) => `book/${d}/${f}`));

let stale = 0, problems = 0;
for (const chapter of chapters) {
  const fm = matter(fs.readFileSync(path.join(root, chapter), "utf8")).data;
  const { source, source_commit: recorded } = fm;
  if (!source || !/^[0-9a-f]{40}$/.test(String(recorded || ""))) { console.log(`PROBLEM ${chapter}: missing source or source_commit`); problems++; continue; }
  if (!fs.existsSync(path.join(root, source))) { console.log(`PROBLEM ${chapter}: source ${source} no longer exists`); problems++; continue; }
  const current = git("log", "-1", "--format=%H", "--", source);
  if (!current) { console.log(`PROBLEM ${chapter}: no commit found for ${source}`); problems++; continue; }
  if (current === recorded) { console.log(`ok      ${chapter}  ${recorded.slice(0, 7)}`); continue; }
  stale++;
  console.log(`STALE   ${chapter}`);
  console.log(`        source:   ${source}`);
  console.log(`        recorded: ${recorded}`);
  console.log(`        current:  ${current}`);
  let ancestor = true;
  try { cp.execFileSync("git", ["-C", root, "merge-base", "--is-ancestor", recorded, current]); } catch { ancestor = false; }
  if (!ancestor) { console.log("        the recorded commit is not an ancestor of the current one"); continue; }
  const between = git("log", "--format=%h %ad %s", "--date=short", `${recorded}..${current}`, "--", source);
  console.log("        commits since conversion that changed the post:");
  between.split("\n").forEach((l) => console.log("          " + l));
}

console.log(`${chapters.length} chapters checked: ${chapters.length - stale - problems} current, ${stale} stale, ${problems} with problems`);
if (stale || problems) {
  if (stale) console.log("Reconvert each stale chapter with book/tools/convert.js and commit it.");
  process.exit(1);
}
