---
chapter: 7
title: "Your Documentation Only Knows What One Person Noticed"
source: blog/posts/the-discipline-of-research/index.html
---

Thirty of us went on the same picnic. Only a few came back with the real story.

I must have been twelve. We spent a day out as a class, and afterwards the teacher set us an assignment: write a story about the picnic. We had all been there. We had all seen the same day.

I wrote mine from memory. The food, the field, the long bus ride home. I sat down believing I already had everything the assignment needed, because I had been present for all of it, and presence felt like the same thing as knowledge. It was not a bad story. It was simply the size of one boy’s afternoon.

A few students did something else. They went around asking. They asked classmates what had happened at the far end of the field. They asked the guides why the schedule changed. They even asked strangers who happened to be there.

Those students came back with things no single pair of eyes could have caught: the reason behind the delay, the moment that happened while everyone else was looking the other way. Same day. Same hours. Completely different documents. The difference was not talent, and it was not better sentences. It was research.

Most people think research means finding out more about a thing you already broadly understand. That is part of it, the smaller part. Research is the act of treating your own view as incomplete on purpose, then going to find the rest of it. I was not lazy that afternoon. I simply trusted that my one view of the day was the whole day. It never is.

In Part 6, I argued that assumption is the enemy of accurate documentation. This post is about the antidote. Research is the first of the three stages that come before you write a single sentence, and it is the one everything accurate is built on. Not because it is a box to tick, but because a document is only ever as complete as the sources standing behind it.

---

## What research actually is

When most writers research, they go looking for confirmation. They already sense what the document will say, and they collect the facts that agree. This feels productive. It is mostly decoration. You are not learning anything: you are assembling evidence for a conclusion you reached before you started.

Real research runs the other way. It begins by treating the gaps in your understanding as the most important part of the work, and it draws on more than one kind of source to close them. The product you use and the people you interview are primary sources, the ones you generate yourself. The existing docs, the support tickets, the release notes are secondary, someone else’s account of what happened. A strong document is built from both, and it never mistakes one for the other.

That distinction matters more than it sounds. A support ticket tells you that someone struggled, which is useful. It does not tell you what they were trying to do, what they expected, or what they tried before they gave up and wrote in. Treat the ticket as the event and you will document the complaint. Treat it as a pointer to an event you have not yet seen, and you will go and find what actually happened. Secondary sources are where you learn what to ask. They are not where you learn the answer.

::: pull-quote

The size of your document is decided before you write it, by how many people you were willing to ask.

:::

That willingness is the discipline. Everything after it is technique.

---

## The shift: observation versus inquiry

:::: contrast

::: column

### Observation

The Single View

“I was there. I saw it happen. I will write down what I saw.”

Result: one corner of the truth, told well.

:::

::: column

### Inquiry

The Assembled View

“I will find the people who saw what I missed, and keep asking until the picture is whole.”

Result: the whole room, not one corner.

:::

::::

Observation is not the weak half of this pair. Walking the product yourself is the only source you can interrogate without permission, at any hour, as many times as you need, and nothing a person tells you replaces it. It is where you find the behaviour nobody thought to mention, because nobody who built it still notices it.

What observation cannot do is show you what the thing looks like to someone who does not already know what you know. The moment you have walked a process once, you are no longer able to meet it cold, and the knowledge you just gained becomes invisible to you. That is the problem Part 4 described: the better you understand something, the worse you become at imagining not understanding it. Your own walk through the product makes you more accurate and less representative at the same time.

So the two are not alternatives, and the arrow runs one way. Observation generates the questions. Inquiry answers them. A writer who only observes produces a confident document about a product nobody else experiences the way they do. A writer who only asks collects opinions with nothing underneath them. The order is what makes it work: look first, so that you know what is worth asking, then ask, so that you find out what looking could never show you.

---

## Who you ask is the whole job

The students who wrote the best stories did not stop at one classmate. They moved between many: friends, guides, strangers. Each held a fragment. The story lived in the assembly of those fragments, not in any one of them.

On a documentation project, the map of who holds a fragment is more obvious than people assume, and each source on it knows something the others structurally cannot.

The product itself comes first, and it is the only one you can interrogate without asking anyone. You walk the process, you click the buttons, you break it on purpose to see how it behaves when someone does the wrong thing.

Engineers know why a thing was built the way it was, which is usually more useful than knowing what it does, because the reason explains the behaviour a reader will find strange.

Support knows the questions users actually arrive with, rather than the ones you imagine they have. That gap is wider than most writers admit, and it is measured daily by people who are not writers.

Users know the one thing none of the others can see: where the product stops making sense to a person meeting it for the first time. They are also the source a writer is least likely to reach, because reaching them usually requires someone else’s permission.

The right questions matter as much as the right people. A weak question asks what does this do. A strong question asks what happens when someone does this wrong, where do people get stuck, what did you assume everyone already knew. Those last questions surface the details that decide whether a document works, and they are usually the ones nobody thought to mention, because they seemed too obvious to say out loud.

On real documentation projects, the same feature rarely has a single description. Ask an engineer to describe it and you get the language of how it was built. Ask support to describe the same feature and you get the language of how it breaks. The two accounts rarely match, and the gap between them is almost always where the documentation needs the most work, because it is the part of the product that is hardest to explain. You only find that gap by asking both.

No single source is the last word, which is the real reason you consult several. Where independent sources agree, you can trust the fact. Where they contradict one another, you have found the exact point the document needs to resolve. Social researchers call this triangulation, and Norman Denzin set out its forms in *The Research Act in Sociology* in 1970. A claim earns its place not when one person asserts it, but when it holds from more than one direction.

---

## Test what you are told

Asking is only half of it. The other half is refusing to take any answer on trust until you have watched it hold.

A subject matter expert hands you the steps to install the product. You write them down, cleanly, in order. Then you run the steps yourself, exactly as written, on a machine as bare as your reader’s. Step four fails. It assumed administrator permissions the engineer never mentioned, because the engineer has always had them. Your reader does not. You only know that gap exists because you walked it. The expert was not wrong. They were complete for themselves and incomplete for the person you are writing for, and only verification finds the difference.

Research has an opposite failure too, and it is quieter. You can consult so widely and gather so much that the document drowns before it is written. So the discipline is not only knowing who to ask. It is knowing when the picture is whole enough to draw, and stopping there. The signal is convergence, not exhaustion: when the next person you ask only confirms what the last three already told you, the research is done. You stop because the answers have started to agree, not because you have run out of people to ask.

Compressed to something you can carry, this stage is two questions asked of every claim before it reaches the page: did I watch it hold, and did it hold from more than one source. The first is verification. The second is triangulation. A fact that cannot answer both is not documentation yet. It is a guess in a confident voice.

::: {.callout label="Feedback audit · Test one assumption"}

Take the three assumptions you wrote down after the previous post and pick the one you are most confident about. If you are arriving here first, take a procedure you have already documented and felt sure of, and find one step you wrote from your own knowledge rather than from watching it happen.

Now run it on a clean setup, exactly as written, and note the first place a real user would stumble. That gap, between what you knew and what you verified, is the whole of this post.

:::

Research tells you what is true, and how widely true it is. But not everything true belongs in the document. The next stage decides which of everything you have gathered this particular reader actually needs, and in what depth. That is audience analysis, and it is where Part 8 begins.

*The students who asked did not write better sentences than I did. They simply knew more by the time they sat down.*

::: {.further-reading label="Further reading"}

Suzan Last, [Technical Writing Essentials](https://pressbooks.bccampus.ca/technicalwriting/part/researchmethods/), chapter 5, on conducting research, evaluating sources, and mapping who to consult.

:::
