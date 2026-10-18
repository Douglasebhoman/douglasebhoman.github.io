---
chapter: 9
title: "Your Documentation Is a Series. Your Reader Skipped Part 1."
source: blog/posts/information-architecture-in-documentation/index.html
---

This series was meant to run in a different order. A page I had already published would not let it.

That is a story about information architecture, the part of documentation work that decides how pieces relate to one another rather than what order they happen to sit in.

The original outline put Docs-as-Code at Part 7. It is the subject I work in most, and it seemed the natural next step after Part 6 introduced structured writing. Then I sat down to write Part 7, reread how Part 6 ended, and found it had already made a promise. It had set out the three stages that come before a single sentence is written, research, audience analysis and information architecture, and told the reader that the posts which followed would take each one in depth, beginning with research.

Consider what following the plan would have done to a reader. They finish Part 6, which has just told them research comes next. They click through to Part 7 and land on a post about Docs-as-Code. Nothing in it is wrong. It is simply not what they were promised, arriving at exactly the moment the series had told them where to go. That reader is not lost because the writing failed. They are lost because one page depended on another, and the other did not keep its side of the arrangement.

So I rebuilt. Research became Part 7, audience analysis became Part 8, and this post became Part 9. Docs-as-Code moved to the end, to the point at which all of this thinking becomes infrastructure.

At the end of Part 8, I said that a document with the right information in the wrong sequence still fails its reader. That is true, and it is incomplete. The sequence of this series was never really decided by the plan. It was decided by what each part depended on. Once one piece made a promise, the pieces after it had to honour it, and the order followed from that.

That is what information architecture actually is. Not arranging pages into an order, but deciding how they relate to one another, and letting the order fall out of those relationships. Part 2 of this series was about the windows between pages, the routes a reader takes from one to the next. This post is about what has to exist inside a page for any of those windows to lead somewhere.

---

## Order is the writer’s view

A series is an attractive structure for teaching. It breaks a large subject into parts, creates progression, and lets one concept prepare the reader for the next. I have used it for almost everything I have built, from [*Git & GitHub for Technical Writers*](https://douglasebhoman.com/git-github-for-technical-writers-series/) to [*MkDocs for Technical Writers*](https://douglasebhoman.com/mkdocs-for-technical-writers/), because I wanted readers to experience a subject as a story rather than a pile of disconnected explanations.

But the writer knows the whole journey, and the reader may know only the page in front of them. I can see why one topic precedes another because I made that decision. Someone arriving at Part 4 from a search result has none of that. They may not know what the series covers, why this topic matters, or whether they need to read something else first. The sequence exists in the writer’s head. Without architecture it stays there, and a series becomes a collection of pages with numbers attached.

:::: contrast

::: column

### Sequence

The Writer’s View

“Part 1 leads to Part 2. Part 2 leads to Part 3. Each page prepares the reader for the next.”

Result: a coherent path, if the reader walks it.

:::

::: column

### Orientation

The Reader’s View

“This is where I am. This is what I need. This is how it connects to the rest.”

Result: a page the reader can enter from anywhere.

:::

::::

Sequence is not wrong. It is incomplete. It describes the order the writer intended, and it quietly assumes the reader will follow it.

---

## Architecture is a decision about relationships

The more useful work is not deciding which page comes first. It is deciding how the pieces depend on one another. Which concepts require other concepts to make sense? Which pages can be understood on their own? Which need to point a reader towards something they may be missing? Which information belongs here, and which should wait until the reader needs more depth? And the hardest to answer honestly: which connections reflect the reader’s understanding, and which simply reflect the order in which the writer happened to create the content?

Those are not navigation questions. They are questions about understanding. The Part 6 promise was a relationship of this kind made visible: one page depended on another existing, in a particular form, immediately after it. Most relationships in documentation are quieter than that. A procedure assumes a concept was explained somewhere. A reference page assumes the reader already has the tool installed. Architecture is the work of finding those assumptions and deciding, deliberately, how each one is met.

Structured authoring made this explicit long ago. The DITA specification puts the connections in a separate file: maps, it says, [define relationships among the topics they reference](https://docs.oasis-open.org/dita/v1.2/os/spec/archSpec/purpose-of-ditamaps.html), and exist so that content can be reused across multiple contexts. Writing each topic so that it can stand alone is the convention that grew on top of that, rather than anything the standard itself requires. You do not need a content management system to borrow either half. Write each page so it can stand alone, and treat the relationships between pages as something you design rather than something the order of writing happens to leave behind.

I had that principle sitting in a file of my own and had not looked at it in a long time. Revising this post, I opened the configuration for *MkDocs for Technical Writers*, one of the guides linked above. MkDocs holds the whole navigation in a single list inside that file, which is the same idea as a map: no page knows its own position, and that one list holds the order on behalf of all of them.

The guide has eleven pages. The list named seven. Two of those seven named files that no longer existed, because I had renamed the pages and left the list alone, so a reader clicking Configuration in the menu arrived at a page that was not there. Of the eleven pages, five were reachable from the menu. Six were not in it at all, including the two a newcomer needs before anything else.

Nine of the ten content pages open by placing themselves in the guide. Prerequisites names What is MkDocs. Installation names Prerequisites. Creating a Project names Installation. Every one of those sentences was correct. The prose had kept the relationships intact, and the single file whose entire purpose was to hold them had lost most of them. No reader had written to tell me.

It is fixed now. What is worth saying is how it was found: not from a report, not from a complaint, but by opening the file that was supposed to know. Nothing on any page was wrong. Architecture does not fail loudly, because the thing that breaks is not on a page at all.

---

## Every page has two responsibilities

Designing for a reader who may arrive anywhere gives every page two jobs. The first is local: help the reader understand or do something on the page itself. The second is contextual: make the page’s place in the larger subject understandable. A page that only does the first is useful, and leaves the reader stranded afterwards. A page that only does the second explains where it belongs, then leans on knowledge the reader has never met.

::: pull-quote

A page should be able to stand on its own without losing its place in the larger story.

:::

The elements that carry the second job are small, and most of them belong in the prose rather than the navigation. An opening that says what the reader is about to learn and why it matters. A short note on what they should already know. A sentence that places this page among the others. You have been reading them throughout this series. Part 8 opened by recalling what Part 7 established before naming the stage it would cover, and every post has closed by naming what comes next. None of it is elaborate. It means a reader who arrives at any part can tell what came before, and whether they need it, from the page itself, before touching a single link.

---

## Independence is not duplication

There is a trap on the far side of this. Once you accept that readers arrive out of order, it is tempting to make every page entirely self-contained: a fresh introduction to the subject, every concept explained again, every prerequisite restated. The intention is good. The result is its own kind of failure. Readers who follow the intended path meet the same explanations repeatedly, and the writer now maintains several versions of one idea, which drift apart the first time one of them is updated.

A page needs enough context to be understood, not a copy of everything that makes it understandable. Sometimes a single sentence is enough. Sometimes a link to the prerequisite is the right decision. Sometimes the honest answer is that a concept is explained later, and the reader can continue without it for now. The aim is not to put the entire learning experience on every page. It is to make every page a usable way in.

::: {.callout label="Connectivity audit · Walk the path"}

Pick a task a real reader arrives with, one that takes more than a single page to complete. Then walk it end to end, using only the documentation and only the links inside it. No search, no guessing, no using what you already know.

Note three things as you go. Where you had to leave the path and search. Where a page assumed something the previous page never gave you. And where the path simply stopped, with the task unfinished and nothing telling you what came next.

Page-by-page review never finds these, because every page on a path can carry its own orientation perfectly while the path between them is broken. A relationship is not visible from either end of it. The only way to audit one is to travel it.

:::

Research tells you what is true. Audience analysis decides what belongs. Architecture decides how it all relates. Every one of those is thinking, and so far it has lived in the writer’s head. [Part 10](/blog/posts/docs-as-code-in-practice/) is where it stops being a private discipline and becomes infrastructure: versioned, reviewed, and shipped alongside the product it describes. That is Docs-as-Code, and it is where this series ends.

*One page kept its promise and made me rebuild a series. One list stopped keeping its promises and nobody noticed at all.*
