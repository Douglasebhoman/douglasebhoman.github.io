---
chapter: 10
title: "Your Documentation Should Not Need Four Copies of the Truth"
source: blog/posts/docs-as-code-in-practice/index.html
source_commit: 21fa643b414b7e34f1e26b75fa1a19098eb6204b
---

For days, possibly weeks, my own site was quietly telling readers the wrong thing about my latest writing.

That is a story about Docs-as-Code, and about the gap between having documentation in a repository and having a system that keeps it coherent.

I did not find it by checking. I opened the Work page to see whether that section still matched my brand standards, and there it was: three cards under a heading that said Latest Writing, and not one of them was the piece I had just published. Part 7 was live. The repository knew. The blog index knew. The Work page was still recommending older work.

I cannot tell you how long it had been wrong, because nothing told me. No build failed. No link broke. The page looked exactly as it was designed to look. It was simply out of date, and it would have stayed out of date for as long as I did not happen to look at it.

Fixing it took two minutes, and that was the part that bothered me. I had already published the article. Why was I still walking around my own site telling it about something it already contained?

---

## The problem was not Git

By any description I would have given at the time, I was already doing Docs-as-Code. The content lived in a repository. Everything was versioned. The site was generated from those files by a build. Branches, history, review, deployment on push, all of it was in place.

And I was still maintaining the same fact in four places by hand.

Those two things are often treated as the same thing, and they are not. Putting documentation in Git makes it versioned. It does not make it coherent. A repository can record every change you make and still leave you personally responsible for remembering every other place that change was supposed to reach.

The reason is in what version control is built to hold. Its unit is the change. A commit is a precise, permanent record of what moved, when, and at whose hand, and that record is genuinely valuable. But a change is not an invariant. Git can tell you that a file was edited. It has no way to know what that edit was supposed to keep true elsewhere, because nothing ever told it that the relationship existed.

So version control answers one question completely and another not at all. What changed, and who changed it: answered, permanently, for the life of the project. What else should have changed: not a question the system can even be asked. No amount of branching discipline closes that gap, because the gap is not in how carefully you commit. It is in what the tool was built to know.

---

## One fact, four surfaces

Publishing a post on my site meant remembering the post itself, the featured block at the top of the blog index, the series strip beneath it, the grid of cards below that, the Latest Writing strip on the Work page, and the sitemap. Most of those I updated out of habit. The Work page I forgot, because it sits on a page I have no reason to open while publishing.

That last clause is the whole mechanism, and it generalises. The copies that go stale are not the ones you are careless about. They are the ones that live outside the moment of change. Every surface I updated reliably sat on a path I was already walking: publish the post, look at the blog, see the cards. The one I missed sat on a page the act of publishing gave me no reason to visit.

Which means the copies most likely to be wrong in any documentation set are the ones furthest from the workflow that should update them. A release note duplicated in the installation guide gets caught. The same fact sitting in a partner-facing PDF does not, because shipping a release has never once involved opening it.

A checklist would have caught mine. But a checklist is a person promising to remember a relationship the system knows nothing about. At that point the workflow depends on memory, and memory is the least reliable component in any system.

::: pull-quote

Memory is not infrastructure.

:::

The better question was never what do I need to remember to update. It is what should change when this file changes. The first is a systems question. The second is a memory test, and I had been quietly failing it for weeks.

:::: contrast

::: column

### Copies

The Memory Test

“Publish the post. Then update the index, the strip, the grid, the Work page and the sitemap.”

Result: a truth that goes stale without telling you.

:::

::: column

### Source

The System’s Job

“Publish the post. Everything that depends on it derives from the post itself.”

Result: one place where being right is enough.

:::

::::

---

## One source, many surfaces

The article already knew almost everything those other surfaces were displaying. Its title. Its date. Its part number. Its image. Its excerpt. Its place in the series. None of that needed to be typed into another file. It needed to be readable from the file that already held it.

So I changed the relationship rather than the content. Those facts were already sitting at the top of each post as structured metadata, which is the part that matters: they were not prose the build had to interpret, they were fields it could read. That turns a post from a document into something the site can query. Every surface that showed something about a post stopped keeping its own copy and started asking the posts themselves.

That sounds like an implementation detail, and it is not. It moves a responsibility. The writer creates the source. The system creates the representations.

To prove it worked, I created a temporary post, gave it a part number, and rebuilt the site. The featured block changed. The series strip changed. The grid changed. The strip on the Work page changed. Four surfaces, one file, no other edits. Then I deleted the test post, rebuilt, and everything went back.

My first reaction was not satisfaction. It was mild irritation. Every one of those manual updates I had been carefully making, and occasionally forgetting, had been unnecessary. That work was never part of writing. It was a consequence of how I had built the thing.

It is easy to reduce Docs-as-Code to a list of tools. Git, Markdown, pull requests, continuous integration, a static site generator, linters. Those matter, and I use all of them. But the tools are not the idea. The idea is that documentation should behave like an engineered system. A change should have one known source. Relationships should be explicit rather than remembered. Changes should be reviewable. The published result should be reproducible from the source. And repeated information should be derived, not synchronised by hand.

What that buys the writer is attention. If the system handles mechanical consistency, I am no longer asking whether I updated the other page. I am asking whether this is still the right information for this reader. The first question is maintenance. The second one is the work.

---

## The decisions have to survive

That shift matters more than it sounds, because attention is what the rest of this series was asking for. Parts 6 to 9 were about decisions. Research establishes what is true. Audience analysis decides what belongs. Architecture decides how the pieces relate. Each is a judgement a writer makes, and each is fragile in the same way: it exists in the writer’s head, and nothing outside that head enforces it.

Decide that every part of a series should stand on its own, and the decision holds only as long as you remember to write it into every page. Decide that a card should always carry a post’s title, date and excerpt, and the decision starts drifting the moment those values are copied into a second file. Decide that publishing should place a post in the right index, and you have described a build step rather than a rule, until the build actually performs it.

That is what this last part is for. Not a tool bolted onto the end of a series about thinking, but an answer to the question the thinking eventually forces. How do these decisions survive contact with a real project, over time, when the person who made them has forgotten the details?

::: {.callout label="Architecture audit · Count the copies"}

List every fact your documentation states in more than one place. Product name. Version numbers. Supported platforms. Pricing. Default values. The name of the page you keep linking to.

For each one, count the places and ask a single question: does this copy need its own editorial decision, or is it a copy the system could derive from a source? Some genuinely need deciding. The rest are relationships you are currently maintaining with memory.

Then add those counts together. That total is the number of copies you are keeping true by hand, and it is the one number in this exercise you did not already know. Every one of them is waiting to go stale without telling you.

:::

I ran that exercise on this series while writing this post. What it turned up was not a version number or a product name. It was me.

The paragraph describing who I am sat in all ten posts. So did the subtitle line beneath every title. Two facts, twenty copies, inside the files arguing that one fact in four places is an architecture failure. They come from one place now, and changing my title changes the site. My name and my web address are still repeated in the structured data of all ten, which is the next item on the list.

The point is not that I was careless. I had already done this work for post metadata, deliberately, and described it a few paragraphs ago. The exercise still found two more, because an exercise looks where a person has stopped thinking to look.

The Work page failure was small. Nothing broke, nobody was blocked, no customer lost access to anything. That is exactly why it is worth ending on. It was not caused by carelessness, and being a more careful writer would not have prevented it. It was caused by an architecture that allowed one fact to live in four places, and offered no signal when three of them were right and one was wrong.

When documentation keeps going wrong in small ways, the instinct is to be more careful. Usually the better answer is to stop asking the writer to compensate for the system.

This series began with a phrase I use about my own work: narrative is infrastructure. Ten parts later, I can say what I actually mean by it. The words are the visible part. Underneath them sit decisions about what is true, what belongs and how it all relates, and those decisions are only as durable as the system holding them. Build the system, and the writing has somewhere to stand.

*The writer decides what the documentation means. The system keeps that meaning from drifting.*
