---
chapter: 2
title: "Your Documentation is a Bakery. Here is How to Build a Supermarket."
source: blog/posts/your-documentation-is-a-bakery/index.html
---

I went into an open-source project’s documentation to understand one concept, and I came out of it no clearer than when I started.

The pages were detailed, accurate, and clearly written by people who understood the product deeply. What none of them told me was what I was supposed to already know.

A task page does not have that problem. Instructions work mechanically, whether or not you understand them: do this, then this, then check that the output looks like that. A concept page works differently. It either connects to something you are already holding, or it floats. And nothing on those pages told me which concepts sat underneath the one I was reading, or whether I had arrived three levels too early.

No sense of where I was in the structure. No signal of what came before or what should come next. No way to tell whether this was a beginner’s explanation or a note written for someone far deeper in than me. I was somewhere in the middle of a large, well-written document, and it felt like a building with no signs, no floor plan and no windows.

That experience sent me back to a book I had been reading: *Every Page is Page One* by Mark Baker. It changed how I think about documentation entirely.

---

## The supermarket problem

Baker uses a metaphor I have not been able to stop thinking about. A bakery that sells one thing, good fresh bread, will always sell less than a supermarket. Not because the bread is worse. The bread might be better than anything the supermarket stocks.

It is easy to read that as an argument about range, and that reading is wrong. A supermarket does not outsell a bakery simply by stocking more things. It outsells it because of how the stock is arranged. The bread is at the back, so you walk the length of the shop to reach it. The jam sits at eye level beside the bread you came for. Nobody gets lost in a supermarket despite its size, because the layout is doing the work the size would otherwise undo.

That is the part worth keeping, and it is the part the metaphor usually loses. A supermarket is harder to navigate than a bakery, not easier. It survives being large by being designed.

Most documentation is a bakery. One product, one shelf. Accurate, useful, well written, and isolated. A reader arrives looking for one specific thing, finds it or does not, and leaves. Nothing is positioned to catch them on the way.

When I finished my Git and GitHub for Technical Writers series, that is what I had built. Six parts, clear and practical, each one solving its own problem properly. Someone could land on Part 3, get exactly what they came for, and leave, and nothing on that page would suggest there was a larger conversation about documentation architecture that the part they were reading belonged to. I had written the bread carefully and built no aisles.

:::: contrast

::: column

### The Bakery

The Shelf

“Is this page good? Is it accurate? Does it answer the question it was written to answer?”

Result: one good page, found or not found.

:::

::: column

### The Supermarket

The Aisle

“What else does this reader need? What sits next to this? How do they find it without knowing to search for it?”

Result: a reader who came for one thing and left with three.

:::

::::

Both columns care about the reader. Only one of them accounts for the fact that the reader does not know what they do not know. A page can be perfect and still be a dead end, and a dead end is a page that answers the question the reader was able to ask rather than the question they actually had.

---

## Every page is page one

Here is Baker’s core idea, and why it governs how documentation gets built: you cannot control which page your reader lands on first. They arrive through a search result, a Slack message, a colleague’s bookmark, a link buried in a Stack Overflow answer. They enter anywhere, and wherever they enter becomes their Page One.

Which means every page has to be able to stand alone. Not in isolation, but with enough orientation that a reader arriving cold can work out where they are, what the page assumes, and where to go next.

Concept pages are where this is hardest, and where it is skipped most often. A concept page’s entire job is to install something in the reader, and it cannot do that without declaring what it is building on. The documentation I got lost in was not short of content. It was missing the one line at the top of each concept page that would have told me whether I was ready for it.

::: pull-quote

Not every page will suit every reader. But every page should be findable by the reader it was written for.

:::

## What a window actually looks like

A window, in the Every Page is Page One sense, is a connection embedded in the content itself: a signal that there is more available, where it lives, and why it might matter to this reader. It is not a “see also” list at the bottom of the page. Those get skipped, because by the time a reader reaches the bottom they have already decided whether the page worked.

Some windows are structural. On this series, every part states its position in the sequence, names the part that follows and what it does, and offers the parts either side of it. A reader who lands on Part 3 is told within the first screen that Part 3 is a position rather than a whole, which is the specific thing the documentation I got lost in never did.

Other windows sit inside a sentence. On a page about Git branching workflows, a window might read: if you are deciding how this fits into a larger documentation system rather than how to run the command, that is a different question, and here is where it is answered. That reader came for bread. You have just put the jam at eye level.

The difference between a window and a link is intent. A link says this exists. A window says this exists, and here is the reader it is for, and you might be them.

You can test any page for this in about a minute, and what comes back tells you which kind of problem you are holding. A page that fails these checks does not have a writing problem. No amount of rewriting fixes a page that never says where it sits.

::: {.callout label="Connectivity audit · Page one test"}

Open any page of your current documentation. Not the homepage and not the getting-started guide. Something from the middle. Then ask:

1. Does this page tell me where I am in the overall structure?
2. Does it connect to the content I am likely to need next?
3. Does it signal what knowledge it assumes?
4. Could someone arriving here cold find their footing in thirty seconds?

Then make the smallest possible repair. Find the single most important concept on the page, decide which other document a reader of this page would also need, and add one sentence naming it and saying who it is for. One sentence, one link. Most readers will not take it. The reader it was written for will, and that is the one who comes back.

:::

## The reader you never hear from

Deciding what goes on which shelf, how the aisles connect and what signage points where is work that nobody requests. There is no ticket for it. No reviewer checks it, and no metric reports it, because the thing it prevents leaves no trace.

A page with no window does not fail loudly. The reader arrives, gets the one answer they knew how to ask for, and leaves satisfied, having never found the three things that would have actually solved their problem. They do not complain, because from where they were standing the page worked. You never hear from them, and you never learn what they went away still needing.

Windows are how you reach that reader before they go. One sentence at a time, built once, working quietly for as long as the structure holds.

Part 3 moves from philosophy to practice: how product teams actually handle documentation, where the handoffs break, and what a systems thinker does differently at each stage.

*Those pages assumed a reader I was not. Nothing in them said which reader that was.*

::: {.further-reading label="Further reading"}

Mark Baker, *Every Page is Page One: Topic-Based Writing for Technical Communication and the Web*. The source of the bakery, the supermarket, and the argument that every page is someone’s first.

:::
