#!/usr/bin/env node
// Fail when the committed chapters and the posts do not correspond exactly.
//
//   node book/tools/check-regenerated.js
//
// Every chapter book/<part>/NN-<slug>.md is regenerated from
// blog/posts/<slug>/index.html as chapter NN, and the result is compared with
// the committed file byte for byte. The number and the post come from the file
// name, never from the chapter's front matter, so the front matter the converter
// emits (chapter, title, source) is compared like every other line. NN must
// equal the post's part number.
//
// Every series post must have a chapter. A post with no chapter fails, by name.
//
// This catches a post edited without reconverting its chapter, a chapter edited
// by hand anywhere including its front matter, a converter change not followed
// by reconversion, and a published post never converted. It cannot see a
// converter that drops content, because the committed chapter and the fresh
// conversion would drop it alike; book/tools/verify.js compares against the post.
//
// The check never writes a chapter. When it fails, a person re-runs
// book/tools/convert.js, reads the result, and commits it.

const path = require("path");
const fs = require("fs");
const os = require("os");
const cp = require("child_process");
const { convert } = require("./convert.js");
const { root, listChapters, seriesPosts } = require("./chapters.js");

const chapters = listChapters();
const posts = seriesPosts();
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "book-check-"));
let failures = 0;
const fail = (msg) => { failures++; console.log("FAIL    " + msg); };

for (const ch of chapters) {
  if (ch.error) { fail(`${ch.file}: ${ch.error}`); continue; }
  if (!fs.existsSync(path.join(root, ch.source))) { fail(`${ch.file}: no post at ${ch.source}`); continue; }
  const post = posts.find((p) => p.source === ch.source);
  if (!post) { fail(`${ch.file}: ${ch.source} is not a series post (no part number, or a draft)`); continue; }
  if (post.part !== ch.number) { fail(`${ch.file}: the file name says chapter ${ch.number} but ${ch.source} is part ${post.part}`); continue; }
  let fresh;
  try { fresh = Buffer.from(convert(ch.source, ch.number).text, "utf8"); }
  catch (e) { fail(`${ch.file}: the converter refused ${ch.source}: ${e.message}`); continue; }
  const committed = fs.readFileSync(path.join(root, ch.file));
  if (fresh.equals(committed)) { console.log(`ok      ${ch.file}`); continue; }
  fail(`${ch.file} differs from a fresh conversion of ${ch.source}`);
  const freshFile = path.join(tmp, path.basename(ch.file));
  fs.writeFileSync(freshFile, fresh);
  const diff = cp.spawnSync("git", ["diff", "--no-index", "--no-color", "--word-diff=plain", "--", path.join(root, ch.file), freshFile], { encoding: "utf8" });
  const body = (diff.stdout || "").split("\n").filter((l) => l && !/^(diff --git|index |--- |\+\+\+ )/.test(l));
  console.log("        committed [-...-], fresh conversion {+...+}:");
  body.forEach((l) => console.log("        " + l));
  if (!body.some((l) => /\[-|\{\+/.test(l))) console.log("        (the difference is in whitespace or line endings only)");
}

const chapterNames = new Set(chapters.map((c) => path.basename(c.file)));
for (const p of posts) {
  if (!chapterNames.has(p.expected)) fail(`${p.source} (part ${p.part}) has no chapter: expected book/part-*/${p.expected}`);
}
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`${chapters.length} chapters and ${posts.length} series posts checked: ${failures} failure${failures === 1 ? "" : "s"}`);
if (failures) {
  console.log("Run book/tools/convert.js for each failing chapter and each post with no chapter, read the result, and commit it.");
  process.exit(1);
}
