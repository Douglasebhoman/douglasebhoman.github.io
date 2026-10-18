---
chapter: 4
title: "Writing for Developers vs Non-Technical Users"
source: blog/posts/writing-for-developers-vs-non-technical-users/index.html
source_commit: 45a6993e3af6ddc3e09e1ad338a51fa839936740
---

Earlier this year I documented douglasebhoman.com, my own portfolio site. I built it. Every line of HTML, every CSS variable, every deployment pipeline. There is no version of this site I do not understand. And writing developer documentation for it was one of the hardest writing tasks I have done.

Not because the system was complex. Because I knew it too well. Every assumption I had made during the build, assumptions so familiar they had stopped being visible to me, had to be surfaced, named and explained for someone who was not me.

That difficulty has a name and a literature. In 1989, Camerer, Loewenstein and Weber gave it one: the curse of knowledge, the finding that better-informed people cannot set aside what they know when predicting what less-informed people will think. Their experiments were in asset markets rather than documentation, but the judgement at the centre of them is the writer’s judgement exactly. One group forecast eight companies’ earnings. A second group, who had been shown the real figures, tried to predict what the first group had guessed. Knowing the answer made them worse at modelling people who did not.

It does not spare you just because the system is your own. It hits harder, because there is nobody else to notice what you left out.

---

## Two questions, not one

The usual framing of this problem is developers against everyone else, and that framing is incomplete. It describes one variable and then behaves as though it were the only one.

There are two, and they move independently.

The first is about vocabulary and assumed context. What can I take for granted? Does this reader know what an endpoint is, what a parameter does, what this acronym expands to? That is the developer and non-technical axis, and it governs word choice, how much you define, and how much you explain before you can begin.

The second is about what the reader came to do. Did they open this page to understand something, or to get something done? That axis governs structure, length, and whether context is valuable or obstructive.

Those are not the same question, and they do not line up. A senior engineer reading about a system architecture before a design review came to understand, and wants the long version with the reasoning intact. A marketing manager trying to export a report before a meeting came to use, and every sentence of background between them and step one is a cost. Both readers exist. Both are badly served by documentation that assumes the audience axis settles the task axis.

:::: contrast

::: column

### The Tour

The reader came to understand

“Why is it built this way? What were the alternatives? What will this cost me later?”

Context is the value. The detour is the point.

:::

::: column

### The Escort

The reader came to use

“What do I type? What do I click? How do I know it worked?”

Precision is the value. Every word that is not load-bearing is a cost.

:::

::::

A tour guide shows you everything on the way, because the journey is what you came for. An escort takes you to the destination and strips out everything that does not serve arriving. Neither is better. Choosing the wrong one is what produces documentation that is accurate and useless at the same time.

What made documenting my own site disorienting was having to be the escort for a destination I had built. I knew every shortcut. I had to write the long way for a reader who needed the long way, having never once taken it myself.

---

## Same system, different documents

Here is where the usual advice goes wrong. It suggests that writing for two audiences means writing the same information two ways. Usually it means writing two different documents about two different tasks that happen to touch the same part of the system.

:::: cards

::: {.card label="For a developer"}

```
GET /users/{id}
Returns a single user object.
Parameters: id (string, required)
Response: 200 OK
{
  "id": "abc123",
  "name": "Douglas Ebhoman"
}
```

:::

::: {.card label="For a non-technical reader"}

Open **Customers**, search by email address, and open the record. Everything the system holds about that person is on this page, including the reference our engineers will ask you for if you raise a support ticket.

:::

::::

Both columns touch the same user record. Neither is a translation of the other. The person on the right will never call that endpoint, so explaining it to them in analogy serves nobody: it performs accessibility without doing any work. What they need is the task they actually have, written in the words their screen uses, with one bridge to the other document at the point where the two readers meet, which is the support ticket.

That is the real relationship between developer and user documentation. Not two depths of one explanation. Two jobs, connected at the seams.

Getting that relationship wrong produces two failure modes, and most writers live in one of them.

The first is not trusting the developer. Over-explaining code samples, defining syntax any working engineer already holds, adding context nobody asked for. The result wastes their time and signals that the writer does not know who they are writing for, which is the fastest way to lose an audience that was predisposed to skim anyway.

The second is underestimating the non-technical reader, which usually means writing about the system instead of about their task. A page that explains what the integration does, when the reader needed to know which button connects it. The result does not inform, it intimidates, and intimidated readers do not ask for help. They ask a colleague, which is how the drift in Part 3 begins.

I fell into the first when I started on my own site. I kept wanting to explain *why* I had made certain decisions. That is valuable in a blog post. It is noise in a technical reference. Cutting it was the hardest editing I have done, because every sentence I removed was true.

::: pull-quote

Accurate is not the same as useful. Most documentation that fails is already accurate.

:::

---

## Writing for the reader you cannot meet

Inside a product team you work from personas: documented profiles of real reader types, usually built from support data and sales calls. A Senior DevOps Engineer and a Marketing Manager are not the same reader, even on the same product, even on the same feature.

Writing independently, as I do, you build the persona yourself. You make assumptions about who lands on the page and you write for that person deliberately. The friction of writing for someone you cannot interview is part of the work. The skill is in making the assumptions explicit rather than accidental, because an unexamined assumption is just the curse of knowledge wearing a job title.

One asymmetry is worth more than any persona template, and it is the thing most writers miss about non-technical readers.

Developers read documentation non-linearly. They arrive, scan for the code block, read backwards from it if something does not parse, and leave. They are comfortable being lost for thirty seconds because they know the shape of the thing they are looking for.

A non-technical reader reads in order, because they cannot skim for a landmark they would not recognise. That single difference changes everything structural. It means sequence matters more than completeness. It means a step out of order is worse than a step missing, because a missing step produces a question and a wrong order produces a broken system. It means the first screen has to establish what this page will get them, since they cannot jump ahead to find out.

Write for a developer and you are designing for retrieval. Write for a non-technical reader and you are building a path, and the path has to hold even when someone is following it for the first time, slightly anxious, on a deadline.

---

## What progressive disclosure can and cannot do

The usual answer to serving two readers is progressive disclosure, a term from interaction design that Jakob Nielsen has written about at the Nielsen Norman Group: defer advanced or rarely used material to a secondary screen, so the first screen carries only what most people need.

It is a genuinely useful pattern and it is narrower than it is usually sold as. It works when both readers need *the same thing at different depths*. An architecture overview a product manager reads once and an engineer reads properly is a real case. A summary with the derivation one layer down is a real case.

It does not work when the readers need different things. You cannot progressively disclose your way from an admin panel walkthrough to an API reference, because the second is not a deeper version of the first. It is a different document for a different job, and pretending otherwise produces a page that is slightly wrong for everyone.

So the honest test is not how to serve both readers on one page. It is which of the two situations you are in.

::: {.callout label="Writing decision · Before you write a word"}

Answer both questions separately, in this order:

1. What can I assume this reader already holds? That decides vocabulary, how much you define, and what you can leave out.
2. Did they come to understand or to use? That decides structure, length, and whether your reasoning belongs on the page at all.

Then one more: is the other reader after the same thing at a different depth, or a different thing entirely? Same thing, use progressive disclosure and keep one page. Different thing, write the second document and build one deliberate link between them at the point where the two readers actually meet.

:::

---

## Why trying harder does not work

Everything above is mechanical and can be learned in an afternoon. The part that does not get easier is the part those 1989 experiments were actually about.

You cannot reliably simulate not knowing something. Once a system is in your head, the version of yourself who did not understand it is gone, and what replaces that memory is a confident guess about what was hard. The guess tends to be wrong in the same direction: you remember what was interesting to learn and forget what was merely unfamiliar, and the merely unfamiliar is what stops people.

The most useful part of that study is what failed. Some participants were given feedback, and feedback made no measurable difference to the bias. Being told they had been wrong did not make the next judgement better. What halved the bias was the market: the participants who happened to be less affected traded more often, and their activity pulled the price towards the truth. The correction came from the structure, not from anyone getting better at introspection.

That has a direct reading for documentation, and it is not the one writers want. Being told that a page assumed too much does not reliably improve the next page. What improves it is giving the people who are not cursed real influence over the document: the support engineer whose ticket queue is evidence, the new hire who followed the guide and stopped at step four, the reader who asked a colleague instead. Not their opinions, collected politely after the fact. Their findings, with a route into the page and a named person able to act on them.

Which is why this sits in a series about systems rather than about craft. Audience analysis is a skill, and it is a skill with a ceiling that no amount of care will get you past. Above that ceiling it stops being a writing problem and becomes an architecture question: who sees the failure, and what are they able to do about it?

Part 5 turns to what separates a document that works from one that merely exists. The difference shows up in the same three places every time.

*I had built every line of that site, which is why it was hard. There was nothing about it I could meet for the first time.*

::: {.further-reading label="Further reading"}

Colin Camerer, George Loewenstein and Martin Weber, “The Curse of Knowledge in Economic Settings: An Experimental Analysis”, *Journal of Political Economy* 97, no. 5 (1989): 1232–1254. And Jakob Nielsen, [Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/), Nielsen Norman Group, 2006, for the pattern and its limits.

:::
