#!/usr/bin/env node
// Convert one blog post into one book chapter.
//
//   node book/tools/convert.js <post path> <chapter number> <output path>
//   node book/tools/convert.js blog/posts/from-writing-to-documentation-systems/index.html 1 book/part-one/01-from-writing-to-documentation-systems.md
//
// The converter is strict on purpose. Any tag, class or structure it has not
// been taught stops it with an error. Teach it a new structure here, deliberately,
// rather than letting it guess. The mapping it applies:
//
//   h2..h6, p, ul, ol, em, strong, a, code   native markdown
//   p.lead                                   plain paragraph, class dropped
//   pre (optionally pre > code)              fenced code block, language only if
//                                            declared as class="language-x"
//   .callout-gold                            ::: {.callout label="..."}
//   .quick-win                               ::: {.quick-win label="..."}
//   .further-reading                         ::: {.further-reading label="..."}
//   .pull-quote                              ::: pull-quote
//   .contrast-block > .contrast-col          contrast > column; ### title,
//                                            subtitle as a paragraph, then content
//   .audience-comparison > .audience-card    cards > {.card label="..."}
//   hr                                       ---
//
// An outer fence carries one more colon than the fences inside it.
// The output is the front matter (chapter, title, source, source_commit) and
// the body. Nothing from the layout (banner, author bio) is in a post body.

const path = require("path");
const fs = require("fs");
const cp = require("child_process");
const matter = require("gray-matter");
const { parseDocument } = require("htmlparser2");

const root = path.resolve(__dirname, "..", "..");

function convert(postPath, chapterNo) {
  const raw = fs.readFileSync(path.join(root, postPath), "utf8");
  const { data, content } = matter(raw);
  const sourceCommit = cp.execFileSync("git", ["-C", root, "log", "-1", "--format=%H", "--", postPath]).toString().trim();
  if (!/^[0-9a-f]{40}$/.test(sourceCommit)) throw new Error("no commit found for " + postPath);
  const doc = parseDocument(content, { decodeEntities: true });
  const notes = [];

  const fail = (msg, n) => { throw new Error(msg + (n && n.name ? `  <${n.name} class="${(n.attribs || {}).class || ""}">` : "")); };
  const classes = (n) => ((n.attribs && n.attribs.class) || "").split(/\s+/).filter(Boolean).filter((c) => c !== "reveal");
  const isWs = (n) => n.type === "text" && !n.data.trim();
  const kids = (n) => n.children.filter((c) => !isWs(c));
  const attrsOnly = (n, allowed) => {
    for (const a of Object.keys(n.attribs || {})) if (a !== "class" && !allowed.includes(a)) fail(`attribute "${a}" the mapping does not name`, n);
  };

  const esc = (text) => text.replace(/[\\`*_\[\]<>]/g, (ch) => { notes.push(`escaped "${ch}" in: ${text.slice(0, 60)}`); return "\\" + ch; });

  function inline(n) {
    return n.children.map((c) => {
      if (c.type === "text") return esc(c.data);
      if (c.type !== "tag") fail("unexpected node type " + c.type);
      if (classes(c).length) fail("inline element with a class the mapping does not name", c);
      switch (c.name) {
        case "em": case "i": attrsOnly(c, []); return "*" + inline(c) + "*";
        case "strong": case "b": attrsOnly(c, []); return "**" + inline(c) + "**";
        case "code": attrsOnly(c, []); return "`" + c.children.map((t) => t.data).join("") + "`";
        case "a": {
          attrsOnly(c, ["href", "target", "rel"]);
          if (c.attribs.target || c.attribs.rel) notes.push(`link attributes dropped (markdown cannot express them): ${c.attribs.target ? `target="${c.attribs.target}" ` : ""}${c.attribs.rel ? `rel="${c.attribs.rel}"` : ""} on ${c.attribs.href}`);
          return "[" + inline(c) + "](" + c.attribs.href + ")";
        }
        default: fail("inline tag the mapping does not name", c);
      }
    }).join("").replace(/\s+/g, " ").trim();
  }
  const list = (n) => kids(n).map((li, i) => {
    if (li.name !== "li" || classes(li).length) fail("unexpected list child", li);
    return (n.name === "ol" ? `${i + 1}. ` : "- ") + inline(li);
  }).join("\n");

  function codeBlock(pre) {
    attrsOnly(pre, []);
    let lang = "", src = pre;
    const pc = classes(pre);
    const inner = kids(pre);
    if (inner.length === 1 && inner[0].name === "code") { src = inner[0]; attrsOnly(src, []); pc.push(...classes(src)); }
    for (const c of pc) { const m = /^language-([\w+-]+)$/.exec(c); if (m) lang = m[1]; else fail(`class "${c}" on a code block`, pre); }
    const text = src.children.map((t) => { if (t.type !== "text") fail("markup inside a code block", pre); return t.data; }).join("").replace(/^\n/, "").replace(/\n$/, "");
    let ticks = "```"; while (text.includes(ticks)) ticks += "`";
    if (!lang) notes.push("code block has no declared language, so its fence has none");
    return ticks + lang + "\n" + text + "\n" + ticks;
  }

  // A block is { text } or a fenced div { fence, attrs, children }.
  function plainBlock(n) {
    if (n.type !== "tag") fail("unexpected node in block content");
    if (n.name === "p" && !classes(n).length) { attrsOnly(n, []); return { text: inline(n) }; }
    if ((n.name === "ul" || n.name === "ol") && !classes(n).length) return { text: list(n) };
    if (n.name === "pre") return { text: codeBlock(n) };
    fail("block the mapping does not name", n);
  }
  const label = (span, want) => {
    if (span.name !== "span" || classes(span).join() !== want) fail(`expected ${want} first`, span);
    const t = inline(span);
    if (t.includes('"')) fail("label contains a double quote, which a fence attribute cannot carry as written", span);
    return t;
  };
  const div = (fenceName, children, lbl) => ({ fence: fenceName, attrs: lbl === undefined ? null : `{.${fenceName} label="${lbl}"}`, children });

  function labelled(n, cls, labelCls, fenceName) {
    const [first, ...rest] = kids(n);
    return div(fenceName, rest.map(plainBlock), label(first, labelCls));
  }
  function container(n) {
    const cl = classes(n);
    attrsOnly(n, []);
    const only = (want) => { if (!(cl.length === 1 && cl[0] === want)) fail("unexpected class combination", n); };
    if (cl.includes("callout-gold")) { only("callout-gold"); return labelled(n, "callout-gold", "callout-gold-label", "callout"); }
    if (cl.includes("quick-win")) { only("quick-win"); return labelled(n, "quick-win", "quick-win-label", "quick-win"); }
    if (cl.includes("further-reading")) { only("further-reading"); return labelled(n, "further-reading", "further-reading-label", "further-reading"); }
    if (cl.includes("pull-quote")) { only("pull-quote"); return div("pull-quote", kids(n).map(plainBlock)); }
    if (cl.includes("contrast-block")) {
      only("contrast-block");
      return div("contrast", kids(n).map((col) => {
        const cc = classes(col);
        if (!(col.name === "div" && cc[0] === "contrast-col" && cc.length === 2 && /^contrast-col--(left|right)$/.test(cc[1]))) fail("unexpected contrast child", col);
        const out = kids(col).map((p, i) => {
          const pc = classes(p).join();
          if (i === 0) { if (pc !== "contrast-col-title") fail("column does not start with its title", p); return { text: "### " + inline(p) }; }
          if (i === 1) { if (pc !== "contrast-col-subtitle") fail("column title not followed by its subtitle", p); return { text: inline(p) }; }
          if (pc === "contrast-col-quote" || pc === "contrast-col-result") return { text: inline(p) };
          fail("unexpected element in column content", p);
        });
        return div("column", out);
      }));
    }
    if (cl.includes("audience-comparison")) {
      only("audience-comparison");
      return div("cards", kids(n).map((card) => {
        if (!(card.name === "div" && classes(card).join() === "audience-card")) fail("unexpected card", card);
        return labelled(card, "audience-card", "audience-card-label", "card");
      }));
    }
    fail("styled container the mapping does not name", n);
  }

  const blocks = [];
  for (const n of kids(doc)) {
    if (n.type === "comment") fail("HTML comment in body");
    if (n.type !== "tag") fail("unexpected top-level node " + n.type);
    const cl = classes(n);
    if (n.name === "div") { blocks.push(container(n)); continue; }
    if (n.name === "hr" && !cl.length) { blocks.push({ text: "---" }); continue; }
    if (/^h[2-6]$/.test(n.name) && !cl.length) { blocks.push({ text: "#".repeat(+n.name[1]) + " " + inline(n) }); continue; }
    if (n.name === "p" && cl.join() === "lead") { blocks.push({ text: inline(n) }); continue; }
    if (n.name === "img" || n.name === "figure") fail("image in body", n);
    blocks.push(plainBlock(n));
  }

  // Render. A div's colons are 3 plus the depth of the deepest div inside it.
  const depth = (b) => (b.fence ? 1 + Math.max(0, ...b.children.map(depth)) : 0);
  const render = (b) => {
    if (!b.fence) return b.text;
    const colons = ":".repeat(2 + depth(b));
    return [`${colons} ${b.attrs || b.fence}`, ...b.children.map(render), colons].join("\n\n");
  };
  const fm = ["---", `chapter: ${Number(chapterNo)}`, `title: ${JSON.stringify(data.title)}`, `source: ${postPath}`, `source_commit: ${sourceCommit}`, "---"].join("\n");
  return { text: fm + "\n\n" + blocks.map(render).join("\n\n") + "\n", notes, sourceCommit };
}

module.exports = { convert, root };

if (require.main === module) {
  const [postPath, chapterNo, outPath] = process.argv.slice(2);
  if (!postPath || !chapterNo || !outPath) { console.error("usage: node book/tools/convert.js <post path> <chapter number> <output path>"); process.exit(2); }
  try {
    const { text, notes, sourceCommit } = convert(postPath, chapterNo);
    fs.mkdirSync(path.dirname(path.join(root, outPath)), { recursive: true });
    fs.writeFileSync(path.join(root, outPath), text);
    console.log(`wrote ${outPath} (source_commit ${sourceCommit})`);
    [...new Set(notes)].forEach((n) => console.log("note: " + n));
  } catch (e) {
    console.error("REFUSED: " + e.message);
    process.exit(1);
  }
}
