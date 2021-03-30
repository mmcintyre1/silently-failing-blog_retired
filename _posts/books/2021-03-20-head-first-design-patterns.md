---
title: "head first: design patterns"
date: 2021-03-20T22:06:59-04:00
categories:
  - books

header:
  teaser: /assets/images/books/head-first-design.jpg

sidebar:
  - title: authors
    image: /assets/images/books/head-first-design.jpg
    image_alt: A book cover
    text: elisabeth robson; eric freeman
  - title: isbn
    text: 978-1492078005
  - title: publication year
    text: 2020
  - title: word count
    text: "168,000"
  - title: pages
    text: 672

excerpt: Object-Oriented Design patterns brought to you by Noah.
---

This is the first Head First book I've read cover to cover. I have *Head First: Java* sitting on my shelf, and I think I've read the first 80 pages maybe 4 different times. I blame it on Java, not the Head First pedagogy. The idea here, if you've never read one of these, is that they are *approachable*. They use snippy jokes, and light-hearted banter, and cartoons to drive home their point. Learning is easier if it's memorable is the contention. A *Brain-Friendly Guide* says the cover.

I think the jury is still out on how brain-friendly things are and really how much any of this sticks is a matter of praxis rather than theory (and we'll see how receptive my addlepated mind is, but that's on me not them), but I will say that I found this a nice entry to design patterns. I think what might've solidified it is that I could draw lines to the things I've written, to the patterns half-expressed and the difficulties I had extending behavior because I was trying to implement two or three patterns without a higher level understanding of what disorder I was inflicting upon my system as I bumper-carred my way through an implementation. Now, I can say that I was using the **Adapter** pattern to give myself python bindings for that Java library, and then I was making it more suited to my purpose by using a **Facade** over the top. I think the ultimate pudding proof is that I now have a more comprehensive vocabulary to talk about these things and impress my fellow engineers and impose (some) order on my unruly systems. Too much order and I might be out of a job.

All of that being said, I think the book suffers slightly with the Barnyard Problem&trade;, which is what I am calling for now the tendency to teach object-oriented fundamentals by instantiating the Animal Kingdom. The book branches out a bit, having you create *Coffee Shops* and *Gumball Machines*, but for someone who has worked for a while, and professionally for a fraction thereof, I really wish books took a more industry-centric approach. You create text parsers and file system iterators and data streams, not ducks and sandwiches and fruits. I'd love to see these within real systems as opposed to toy examples. The hardest jump for me into the object-oriented life was the jump to thinking about the real nuts and bolts of moving data from *a* to *b* to *y* then back to *b* again as a system of objects interacting.

I've added the OO principles below, which gives you a little hint of the sort of cheeky lame-ish but sincere humor and tone you'll find throughout the book, and might serve as guiding principles as I try and implement some of these lessons to the next system I design. I'd also love to see this book in python or javascript or something that isn't Java.

- Encapsulate what varies
- Favor composition over inheritance
- Program to interfaces, not implementations
- Strive for loosely coupled designs between objects that interact
- Classes should be open for extension byt closed for modification
- Depend on abstractions. Do not depend on concrete classes.
- Only talk to your friends.
- Don't call us, we'll call you
- A class should only have one reason to change.

{% include ratings.html rating=4%}