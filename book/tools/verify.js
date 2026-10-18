#!/usr/bin/env node
// Check one chapter against the post it was converted from.
//
//   node book/tools/verify.js                            every chapter
//   node book/tools/verify.js <post path> <chapter path> one chapter
//
// Reports, and exits non-zero if any check fails:
//   a. prose words: the post body as text, against the chapter body with fence
//      markers, attributes and markdown syntax removed. Container labels are
//      fence attributes in the chapter, so they are set aside from the post's
//      words before the two sequences are compared; check f compares them.
//   b. links: text and target, both sides.
//   c. containers by class in the post, against fenced divs by name.
//   d. raw HTML tags left in the chapter, outside code blocks.
//   e. every fence opens and closes, nests correctly, and an outer fence has
//      exactly one more colon than the deepest fence inside it.
//   f. every label="..." fence attribute, in order, against the label text and
//      container in the post.
// The site build check is separate: build main and the branch from fresh
// checkouts and compare the output trees.

const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");
const { parseDocument, DomUtils } = require("htmlparser2");
const root = path.resolve(__dirname, "..", "..");

const [postPath, chapPath] = process.argv.slice(2);

// With no arguments, check every chapter against the post its file name
// derives (book/tools/chapters.js), each in its own process, and fail if any
// chapter fails. This is how CI runs it.
if (!postPath && !chapPath) {
  const { listChapters } = require("./chapters.js");
  const cp = require("child_process");
  let failedChapters = 0;
  for (const ch of listChapters()) {
    if (ch.error) { console.log(`== ${ch.file}\n   FAIL: ${ch.error}`); failedChapters++; continue; }
    const r = cp.spawnSync(process.execPath, [__filename, ch.source, ch.file], { encoding: "utf8" });
    console.log(`== ${ch.file}  (from ${ch.source})`);
    const indent = (t) => t.replace(/\n$/, "").replace(/^/gm, "   ") + "\n";
    if (r.stdout) process.stdout.write(indent(r.stdout));
    if (r.stderr) process.stdout.write(indent(r.stderr));
    if (r.status !== 0) failedChapters++;
  }
  console.log(failedChapters ? `CONTENT CHECK: ${failedChapters} chapter(s) failed` : "CONTENT CHECK: every chapter passed");
  process.exit(failedChapters ? 1 : 0);
}
if (!postPath || !chapPath) { console.error("usage: node book/tools/verify.js [<post path> <chapter path>]"); process.exit(2); }
const post = matter(fs.readFileSync(path.join(root, postPath), "utf8")).content;
const chap = fs.readFileSync(path.join(root, chapPath), "utf8").replace(/\r/g, "");
const fmMatch = /^---\n([\s\S]*?)\n---\n/.exec(chap);
if (!fmMatch) { console.error("chapter has no front matter"); process.exit(1); }
const mdLines = chap.slice(fmMatch[0].length).split("\n");
const doc = parseDocument(post, { decodeEntities: true });
let failed = false;
const bad = (msg) => { failed = true; console.log("   FAIL: " + msg); };

// ---- text of the post, block aware, so inline tags do not split words from punctuation
const BLOCK = new Set(["p", "div", "li", "ol", "ul", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "span", "hr", "section"]);
const textOf = (n) => n.type === "text" ? n.data : (n.children || []).map((c) => (c.type === "tag" && BLOCK.has(c.name) ? " " + textOf(c) + " " : textOf(c))).join("");
const words = (s) => s.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
const LABELS = ["callout-gold-label", "quick-win-label", "further-reading-label", "audience-card-label"];
const labelNodes = DomUtils.findAll((n) => n.name === "span" && LABELS.some((l) => (n.attribs.class || "").split(/\s+/).includes(l)), doc.children);
const labelWords = labelNodes.reduce((sum, n) => sum + words(textOf(n)).length, 0);
// Kept for check f, which compares each label with its fence attribute.
const LABEL_CONTAINER = { "callout-gold-label": "callout", "quick-win-label": "quick-win", "further-reading-label": "further-reading", "audience-card-label": "card" };
const postLabels = labelNodes.map((n) => ({
  container: LABEL_CONTAINER[(n.attribs.class || "").split(/\s+/).find((c) => LABEL_CONTAINER[c])],
  text: words(textOf(n)).join(" "),
}));
labelNodes.forEach((n) => DomUtils.removeElement(n));
const postWordsNoLabels = words(textOf(doc));
const postWordsTotal = postWordsNoLabels.length + labelWords;

// ---- chapter prose: drop fences, code fence markers and markdown syntax, keep code content as is
let inCode = null; const proseParts = [];
for (const l of mdLines) {
  const cf = /^(`{3,})(.*)$/.exec(l);
  if (cf && (!inCode || cf[1] === inCode)) { inCode = inCode ? null : cf[1]; continue; }
  if (inCode) { proseParts.push(l); continue; }
  if (/^:{3,}( .*)?$/.test(l) || /^---$/.test(l)) continue;
  proseParts.push(l
    .replace(/^#{1,6} /, "").replace(/^(\d+\.|-) /, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*|\*/g, "").replace(/\\([\\`*_\[\]<>])/g, "$1"));
}
const mdWords = words(proseParts.join("\n"));
console.log(`a. words: post body ${postWordsTotal} | chapter body without fences, attributes and syntax ${mdWords.length} | difference ${mdWords.length - postWordsTotal}`);
console.log(`   container labels in the post, now fence attributes: ${labelNodes.length} labels, ${labelWords} words`);
const same = JSON.stringify(mdWords) === JSON.stringify(postWordsNoLabels);
console.log(`   chapter words identical, in order, to post words without labels (${postWordsNoLabels.length}): ${same}`);
if (!same) { const i = mdWords.findIndex((w, k) => w !== postWordsNoLabels[k]); bad(`first difference at word ${i}: chapter "${mdWords[i]}" post "${postWordsNoLabels[i]}"`); }

// ---- b. links
const postLinks = DomUtils.findAll((n) => n.name === "a", doc.children).map((a) => `${DomUtils.textContent(a).replace(/\s+/g, " ")} -> ${a.attribs.href}`);
const mdText = mdLines.join("\n");
const mdLinks = [...mdText.matchAll(/(?<!!)\[([^\]]*)\]\(([^)]*)\)/g)].map((m) => `${m[1].replace(/\*/g, "")} -> ${m[2]}`);
console.log(`b. links: post ${postLinks.length} | chapter ${mdLinks.length}`);
postLinks.forEach((l) => console.log("   post:    " + l));
mdLinks.forEach((l) => console.log("   chapter: " + l));
postLinks.filter((l) => !mdLinks.includes(l)).forEach((l) => bad("only in post: " + l));
mdLinks.filter((l) => !postLinks.includes(l)).forEach((l) => bad("only in chapter: " + l));

// ---- c. containers
const MAP = [["callout-gold", "callout"], ["quick-win", "quick-win"], ["further-reading", "further-reading"], ["pull-quote", "pull-quote"], ["contrast-block", "contrast"], ["contrast-col", "column"], ["audience-comparison", "cards"], ["audience-card", "card"]];
const byClass = {};
DomUtils.findAll((n) => n.name === "div", doc.children).forEach((n) => (n.attribs.class || "").split(/\s+/).forEach((c) => { byClass[c] = (byClass[c] || 0) + 1; }));
const byFence = {}; const labelled = {};
inCode = null;
for (const l of mdLines) {
  const cf = /^(`{3,})/.exec(l); if (cf && (!inCode || cf[1] === inCode)) { inCode = inCode ? null : cf[1]; continue; } if (inCode) continue;
  const m = /^:{3,} (?:\{\.([\w-]+)( label="[^"]*")?\}|([\w-]+))$/.exec(l);
  if (m) { const name = m[1] || m[3]; byFence[name] = (byFence[name] || 0) + 1; if (m[2]) labelled[name] = (labelled[name] || 0) + 1; }
}
console.log("c. containers:");
for (const [cls, name] of MAP) {
  const p = byClass[cls] || 0, f = byFence[name] || 0;
  console.log(`   ${cls.padEnd(20)} post ${String(p).padEnd(3)} ${name.padEnd(16)} chapter ${f}${labelled[name] ? ` (${labelled[name]} with label)` : ""}`);
  if (p !== f) bad(`${cls} ${p} against ${name} ${f}`);
}
console.log(`   post-author-bio      post ${byClass["post-author-bio"] || 0}   dropped`);
for (const name of Object.keys(byFence)) if (!MAP.some(([, n]) => n === name)) bad("fence name with no mapping: " + name);

// ---- d. raw HTML outside code
const html = []; inCode = null;
mdLines.forEach((l, i) => {
  const cf = /^(`{3,})/.exec(l); if (cf && (!inCode || cf[1] === inCode)) { inCode = inCode ? null : cf[1]; return; } if (inCode) return;
  for (const m of l.replace(/`[^`]*`/g, "").matchAll(/<\/?[a-zA-Z][a-zA-Z0-9-]*(\s[^>]*)?\/?>/g)) html.push(`line ${i + 1 + fmMatch[0].split("\n").length - 1}: ${m[0]}`);
});
console.log(`d. raw HTML tags outside code blocks: ${html.length}`);
html.forEach((h) => bad(h));

// ---- e. fences
const stack = []; let opened = 0; inCode = null; let codeBlocks = 0;
mdLines.forEach((l, i) => {
  const cf = /^(`{3,})/.exec(l);
  if (cf && (!inCode || cf[1] === inCode)) { if (!inCode) codeBlocks++; inCode = inCode ? null : cf[1]; return; }
  if (inCode) return;
  const open = /^(:{3,}) \S/.exec(l), close = /^(:{3,})$/.exec(l);
  if (open) { stack.push({ colons: open[1].length, line: i, inner: 0 }); opened++; }
  else if (close) {
    const top = stack.pop();
    if (!top) return bad(`line ${i}: closing fence with nothing open`);
    if (top.colons !== close[1].length) bad(`line ${i}: closes ${close[1].length} colons, opened with ${top.colons}`);
    const want = top.inner ? top.inner + 1 : 3;
    if (top.colons !== want) bad(`fence opened on line ${top.line} has ${top.colons} colons, expected ${want}`);
    if (stack.length) stack[stack.length - 1].inner = Math.max(stack[stack.length - 1].inner, top.colons);
  }
});
if (stack.length) bad(`${stack.length} fence(s) never closed`);
if (inCode) bad("code block never closed");
console.log(`e. fences: ${opened} opened, balanced and nested with the colon rule: ${!failed || stack.length === 0 ? "checked" : ""} | code blocks: ${codeBlocks}, closed: ${!inCode}`);

// ---- f. labels: each label="..." fence attribute, in order, against the label in
// the corresponding post container. Check a sets label words aside, so without
// this no check would ever read a label.
const chapterLabels = []; inCode = null;
mdLines.forEach((l, i) => {
  const cf = /^(`{3,})/.exec(l); if (cf && (!inCode || cf[1] === inCode)) { inCode = inCode ? null : cf[1]; return; } if (inCode) return;
  const m = /^:{3,} \{\.([\w-]+) label="([^"]*)"\}$/.exec(l);
  if (m) chapterLabels.push({ container: m[1], text: m[2].replace(/\\([\\`*_\[\]<>])/g, "$1"), line: i + 1 + fmMatch[0].split("\n").length - 1 });
});
console.log(`f. labels: post ${postLabels.length} | chapter ${chapterLabels.length}`);
const labelCount = Math.max(postLabels.length, chapterLabels.length);
for (let k = 0; k < labelCount; k++) {
  const p = postLabels[k], c = chapterLabels[k];
  if (!p) { bad(`label ${k + 1}: chapter line ${c.line} has ${c.container} label "${c.text}" with no label in the post`); continue; }
  if (!c) { bad(`label ${k + 1}: post ${p.container} label "${p.text}" has no label attribute in the chapter`); continue; }
  if (p.container !== c.container || p.text !== c.text) bad(`label ${k + 1}, chapter line ${c.line}: chapter ${c.container} label "${c.text}" but post ${p.container} label "${p.text}"`);
  else console.log(`   ${k + 1}. ${c.container}: "${c.text}" matches`);
}

console.log(failed ? "RESULT: FAIL" : "RESULT: PASS");
process.exit(failed ? 1 : 0);
