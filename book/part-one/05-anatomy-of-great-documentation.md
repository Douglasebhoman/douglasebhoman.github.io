---
chapter: 5
title: "Anatomy of Great Documentation"
source: blog/posts/anatomy-of-great-documentation/index.html
source_commit: a2b8d9781a13ba79bec4577754f8b423ac631b37
---

Most documentation does not fail at launch.

It fails quietly, weeks later. When a reader clicks a link that goes nowhere. When a procedure ends without telling them what to do next. When a page describes a product that shipped six months ago. Nobody files a bug report. Nobody sends an email. The reader closes the tab.

That is how documentation dies. Not with a complaint. With silence.

---

Earlier in my practice I was working on a product documentation project, and I was rigorous about it. Information accuracy checked. Edited and re-edited ruthlessly. Every sentence earning its place, every technical term defined, every procedure tested before it was written.

And then someone clicked a link. It went nowhere.

What stayed with me was not the broken link. It was the shape of my own rigour. I had tested every procedure in that document. I had not tested a single connection between them. The care went entirely into what each page said and none of it into whether the pages still reached each other, and I had not noticed the gap because the gap was not in anything I was looking at.

::: pull-quote

I had tested every procedure. I had not tested a single connection.

:::

One broken link was enough to isolate an otherwise solid piece of documentation. Not bad writing, not inaccurate information, not poor structure. A single broken connection, and the reader had nowhere to go next.

That forced a question I had not asked before. What actually makes documentation great? Not good, not accurate, not well formatted. Great.

The answer turned out not to be a writing standard. It is an architectural one, and it shows up in the same three places: connectivity, architecture, and feedback responsiveness, in that order, because that is the order in which documentation systems fail.

:::: contrast

::: column

### Exists

Judged at the writing stage

“Is every sentence accurate? Is every term defined? Did every procedure get tested?”

Passes review. Fails quietly, later.

:::

::: column

### Works

Judged at the reading stage

“Where does this reader go next? Does the product still behave this way? Who told us it did not?”

Keeps working while the product moves.

:::

::::

---

## Element 1: Connectivity

There is a version of documentation that is correct in every sentence and still useless. It answers the question the reader asked and not the one they are about to ask. It defines the term and does not link to where the term is used. It explains the procedure and ends without saying where to go next.

That documentation exists. It does not work.

Documentation that works is connected: to other pages, to the product it describes, and to the reader’s next question before they have had to ask it. Think about the last time documentation felt effortless. You probably did not notice the writing or the formatting. What you noticed was that each time you needed the next piece, it was already there. Connectivity is invisible when it is working, which is exactly why it does not get built.

Now think about documentation that frustrated you. The broken link. The reference to a page that no longer exists. The procedure that ended with no next step. None of those were writing problems.

Connectivity is the first thing to break when documentation is treated as a writing task, and the fix is not more careful editing. It is a check that runs without being remembered: a workflow that tests every link on every push and fails the build when one is dead. A careful editor misses a broken link eventually. A build does not miss it at all.

---

## Element 2: Architecture

If connectivity is how pages relate to each other, architecture is whether the documentation as a whole still describes the product that exists.

Most writers are trained for visible threats: grammar, terminology, structural errors. Architecture hides in plainer sight than that. Which pages exist and which do not. How navigation is organised. Where the entry points are and where they lead. Whether this describes the current version of the product or the version that shipped eighteen months ago.

These decisions are rarely made. They accumulate. A page added here, a section deprecated there, a nav item renamed in one place and not another. Over time the documentation develops fault lines: places where the structure no longer matches reality, where readers fall through gaps the writer cannot see because the writer always knows the way.

Architecture problems never show up in a grammar check. They show up when a reader hits a dead end. In support tickets that cite the same page three months running. When a developer onboards and mentions, in passing, that the docs do not match the product.

A document can be technically perfect and architecturally broken. When that happens the writing did not fail. The system did. Writing accurately at launch is the easier half of the job. The harder half is keeping a system accurate while the product moves underneath it.

---

## Element 3: Feedback responsiveness

The third element is not like the first two, and the difference is worth naming rather than smoothing over. Connectivity and architecture are properties of the documentation. You can inspect them by opening it. Feedback responsiveness is a property of the process around the documentation, and the only way to inspect it is to look at what happens after someone reads.

It means the system collects signal from real readers and acts on it. Not a quarterly review. Not a ticket when something visibly breaks. A standing part of how the documentation is maintained.

This is where experience turns against you. Part 4 covered the mechanism and the evidence behind it: once you know a system well, you cannot reconstruct not knowing it, and being told you assumed too much does not reliably stop you assuming it again. The practical consequence lands here. When you already know what good looks like, you stop asking whether it works, and no amount of professional instinct closes that gap, because instinct is the thing producing it.

So documentation quality is not settled at the writing stage. It is settled at the reading stage, and the reading stage happens somewhere you are not.

Which means the signal has to be routed to you rather than waited for. Ask readers what confused them, specifically, about a page you name. Look at which pages people leave from. Notice which support tickets keep citing the same URL. The signal exists in all three places already. What is usually missing is anyone whose job it is to collect it.

---

## The full anatomy

::: {.callout label="The three elements"}

1. **Connectivity.** Every page knows where it leads, and every link goes somewhere that serves the reader’s next question.
2. **Architecture.** The documentation describes the product as it is now, maintained continuously rather than correct once.
3. **Feedback responsiveness.** Signal from real readers reaches the documentation, through a route that exists whether or not anyone remembers to use it.

Remove any one and the documentation still exists. It may still look good. It will not work for long.

:::

The three fail in that order, which is why they are listed in it. Connectivity goes first, because links break on their own. Architecture goes next, because products move. Feedback is last, because its absence is not a failure that happens, it is a failure that was never prevented.

::: {.quick-win label="All three audits · The page probe"}

This is the whole instrument, run on one page. Open any page in your current documentation and ask one question per audit:

1. **Connectivity.** If a reader arrives here from a search engine and clicks every link, where do they end up?
2. **Architecture.** Does every procedure on this page describe how the product behaves today?
3. **Feedback.** When did you last ask a real reader what confused them on this page?

A link going nowhere is a connectivity failure. Content describing behaviour the product has left behind is an architecture failure. Never having asked is a feedback failure, and it is the one you will be tempted to count as a maybe.

Three questions, one page, about a minute. Every other exercise here deepens one of the three or scales it to a set.

:::

The broken link this started with was a connectivity failure, but it taught me about all three. I had the writing right. I had the accuracy right. What I had not built was anything that would tell me when either stopped being true.

That is the anatomy. It is not built once at launch. It is maintained every time the product changes, every time a reader hits a dead end, and every time you are tempted to edit the prose instead of checking the connections.

All three elements, though, assume the content itself is in a shape that can be connected, moved and maintained. A page written as one indivisible block of prose cannot be reused, cannot be reordered, and cannot be updated in one place. Part 6 goes down a level, from the system to the unit it is built from, and asks what a piece of content has to look like before any of this is possible.

*Every procedure was accurate, and a reader following them still stopped at a link that went nowhere.*
