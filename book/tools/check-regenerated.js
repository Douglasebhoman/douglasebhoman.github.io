#!/usr/bin/env node
// Fail when any committed chapter differs from what the converter produces
// from its source post today.
//
//   node book/tools/check-regenerated.js
//
// For every chapter in book/part-*/, run book/tools/convert.js over the post
// named in the chapter's `source` and compare the result with the committed
// chapter byte for byte. Any difference fails the check and is shown as a word
// diff. This catches a post edited without reconverting its chapter, a chapter
// edited by hand, and a converter change that was not followed by reconversion.
// An edit to a post's front matter that the converter does not read changes
// nothing in the output, so it passes.
//
// The check never writes a chapter. When it fails, a person re-runs
// convert.js, reads the result, and commits it.

const path = require("path");
const fs = require("fs");
const os = require("os");
const cp = require("child_process");
const matter = require("gray-matter");
const { convert, root } = require("./convert.js");

const bookDir = path.join(root, "book");
const chapters = fs.readdirSync(bookDir).filter((d) => /^part-/.test(d)).sort()
  .flatMap((d) => fs.readdirSync(path.join(bookDir, d)).filter((f) => f.endsWith(".md")).sort().map((f) => `book/${d}/${f}`));

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "book-check-"));
let failures = 0;
for (const chapter of chapters) {
  const committed = fs.readFileSync(path.join(root, chapter));
  const { source, chapter: number } = matter(committed.toString("utf8")).data;
  if (!source || !Number.isInteger(number)) { console.log(`FAIL    ${chapter}: front matter needs source and chapter`); failures++; continue; }
  if (!fs.existsSync(path.join(root, source))) { console.log(`FAIL    ${chapter}: source ${source} does not exist`); failures++; continue; }
  let regenerated;
  try { regenerated = Buffer.from(convert(source, number).text, "utf8"); }
  catch (e) { console.log(`FAIL    ${chapter}: the converter refused ${source}: ${e.message}`); failures++; continue; }
  if (regenerated.equals(committed)) { console.log(`ok      ${chapter}`); continue; }
  failures++;
  console.log(`FAIL    ${chapter} differs from a fresh conversion of ${source}`);
  const fresh = path.join(tmp, path.basename(chapter));
  fs.writeFileSync(fresh, regenerated);
  const diff = cp.spawnSync("git", ["diff", "--no-index", "--no-color", "--word-diff=plain", "--", path.join(root, chapter), fresh], { encoding: "utf8" });
  const body = (diff.stdout || "").split("\n").filter((l) => !/^(diff --git|index |--- |\+\+\+ )/.test(l));
  console.log("        committed [-...-], fresh conversion {+...+}:");
  body.forEach((l) => l && console.log("        " + l));
  if (!body.some((l) => /\[-|\{\+/.test(l))) console.log("        (the difference is in whitespace or line endings only)");
}
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`${chapters.length} chapters checked: ${chapters.length - failures} match a fresh conversion, ${failures} do not`);
if (failures) {
  console.log("Re-run book/tools/convert.js for each failing chapter, read the result, and commit it.");
  process.exit(1);
}
