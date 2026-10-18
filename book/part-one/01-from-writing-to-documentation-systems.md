---
chapter: 1
title: "From Writing to Documentation Systems"
source: blog/posts/from-writing-to-documentation-systems/index.html
source_commit: 45a6993e3af6ddc3e09e1ad338a51fa839936740
---

Almost nobody who read my Git and GitHub for Technical Writers series started at the beginning.

I had posted each part to LinkedIn as I finished it, which meant the link people clicked was never Part 1. It was whichever part I had written that week. Someone following that link arrived at Part 3 or Part 5 with no idea there were other parts, no sense of what had already been established, and nothing on the page to tell them.

The content was accurate. I had checked that. Each part held together on its own. I had checked that too. What I had never checked was arrival: what it is like to land on one of those pages without the context I was carrying in my head while writing it.

That is not a problem you can fix with a better sentence. Every sentence was already fine.

---

## The symptom nobody names correctly

Every documentation team eventually hits the same wall. The guides are well written. The grammar is clean. The tone is consistent. And yet users still cannot find what they need, engineers still answer the same questions in Slack, and onboarding still takes longer than it should.

The instinct is to write more. Add detail. Create another guide. But the problem is neither the volume nor the quality of what has been written. The problem is that someone decided what the documentation says, and nobody decided how it works.

You have seen the result, even without a name for it. Guides that contradict each other because two writers worked in isolation. Installation docs missing a step everyone on the team knows but nobody wrote down. A getting-started page referencing a feature deprecated eight months ago, with no named owner to fix it. Content scattered across Notion, Confluence, a GitHub wiki, and a PDF someone emailed in 2022.

None of that is a writing failure. Every individual document in that list might be perfectly written. It is a failure of the relationships between documents, and the discipline that governs those relationships has a name: information architecture, the work of deciding how the pieces relate and who maintains the relationship when the product changes.

What accumulates in its absence is something I think of as documentation entropy. Every page that goes stale, every link that breaks, every step that quietly disappears is entropy accumulating, and it compounds, because each drifted page makes the next one harder to trust. A writer who can only fix sentences cannot fix it.

---

## The shift: writing versus systems

:::: contrast

::: column

### Writing

The Document

“Is this clear? Is this accurate? Is this readable?”

Result: a good page, on its own.

:::

::: column

### Systems

The Architecture

“Where does this live? Who owns it? How does it change when the product does?”

Result: documentation that survives the product.

:::

::::

One question is about the quality of a document. The other is about the health of an entire information architecture. Most writers are trained for the first. Most product teams urgently need the second and cannot describe what they are missing, which is why the request that reaches the writer is almost always a request to write something.

---

## Building doors between documents

::: pull-quote

Architecture is the work of building doors between documents, so that nobody is ever lost in the middle of one.

:::

A reader who arrives at Part 3 without reading Part 1 has to find something inside that document telling them it is part of a whole. Not a navigation bar bolted to the side, which readers skip, but something in the piece itself: a line near the top saying what this is and what it assumes, a named thing to go back to, a reason to go forward. Every piece carries its own weight and solves its own problem. It also has to signal its place in something larger.

That is not a formatting decision, and it is not a courtesy. It decides whether the work gets used at all. A document that does not tell readers where they are costs them a decision before it gives them anything, and a reader making a decision is a reader who might leave.

The same thinking applies below the level of a series. Take an installation guide. A writing-focused approach produces clear, accurate, well-formatted steps. A systems-focused approach asks a different set of questions before a single word exists. Should prerequisites be a reusable section or embedded here? How does this guide connect to the configuration guide that follows it? What happens to it when version two ships? Who is the subject matter expert, and how often does this get reviewed?

The two outputs can look almost identical on the page. The difference shows up a year later, when the product has moved and only one of them has moved with it.

## What changed when I rebuilt it

The fix was not rewriting the content. It was changing the infrastructure. The series moved out of a plain repository and became a live site built from Markdown, version controlled in Git, deployed automatically on every push, and organised so that a reader could move through it the way you move through a story, with direction, with context, and with a sense of where they are and where they are going.

The doors turned out to be small and specific. Every part now carries its position on the page, so a reader arriving at Part 3 is told immediately that it is Part 3 of a sequence, not a standalone article. Every part ends by naming the next one and what it will do, rather than stopping. Every part offers the parts either side of it, so moving backwards costs one click rather than a search. None of those are impressive pieces of engineering. They are decisions about arrival, made once, and they are the difference between a reader who orients themselves and a reader who leaves.

Rebuilding it also became content in itself. Documenting the process gave readers something no amount of accurate writing could: a window into how documentation decisions actually get made. By the end I was no longer asking whether the information was correct. I was asking how someone moves through it.

---

## The system always tells you what it needs

The shift from writing to systems thinking rarely happens in planning. It happens in the work: when a broken link reveals a connectivity failure, when a stale page reveals an ownership gap, when a support ticket reveals a findability problem that no amount of careful writing would have prevented.

Most people think technical writing is about writing. The real job is designing how information works, and the system will tell you what it needs long before anyone complains about the prose. The question is whether you are looking at the sentences or at the structure.

::: {.callout label="Architecture audit · Find the source"}

Next time you are asked to fix a typo, pause and ask whether that same error exists in five other places. If it does, you do not have a typo problem. You have a system problem.

A systems thinker does not fix the five instances. They find the source: the template, the shared component, the unowned page, and fix it once. Do that one thing this week, and notice how differently the request looks the second time it arrives.

:::

Part 2 makes the argument concrete, and it begins with shelves. Most documentation is built like a bakery. Building a supermarket is a different job entirely, and the difference is not size.

*Nobody clicks Part 1. They click whatever was posted this week, and that page is the whole series as far as they are concerned.*
