---
title: Classic Computer Science Problems in Python
date: 2021-03-02T22:26:55-05:00
categories:
  - books
header:
  teaser: /assets/images/books/classic-comp-sci-in-python.jpg
sidebar:
  - title: Author
    image: /assets/images/books/classic-comp-sci-in-python.jpg
    image_alt: A book cover
    text: David Kopec
  - title: ISBN
    text: 978-1617295980
  - title: Publication Year
    text: 2019
  - title: Word Count
    text: "66,000"
  - title: Pages
    text: 224
---

As someone without a formal computer science degree, I skipped the part of my education where I needed to implement search algorithms until they haunted my dreams. I could give you the sparknotes on what a binary tree is, or how breadth-first search works, but unless you allowed me to access to Stack Overflow, copy-paste, and a debugger, I'd struggle to implement them (If you want an example of an attempt, look at any of my repos smashing my way through an Advent of Code). Not any more, or at least until the skills atrophy and I need to re-read this book in six months. Maybe I'll try the Java version then.

Kopec takes you through a jaunty tour of some of Computer Science's most classic problems, from binary search to genetic algorithms to minimax. The thing that will be most striking when opening this book is the heavy use of python's type hinting system. Not only are primitives explicitly typed, but more complicated types are also declared. If you aren't familiar with type hints, or think you are but haven't used them for anything more than declaring `int` or `bool`, it is worth a refresher before jumping in. For example, you might be hit with a code block that looks like the below, which might prompt you to say, well, all it's missing is `public abstract class`.

```python
from typing import Generic, TypeVar, Dict, List, Optional
from abc import ABC, abstractmethod


V = TypeVar('V') # variable type
D = TypeVar('D') # domain type


# Base class for all constraints
class Constraint(Generic[V, D], ABC):
    # The variables that the constraint is between
    def __init__(self, variables: List[V]) -> None:
        self.variables = variables

    # Must be overridden by subclasses
    @abstractmethod
    def satisfied(self, assignment: Dict[V, D]) -> bool:
      ...
```

What you end up with is very verbose code that stretches the character limit of the pages of the book. This should be a book that is read next to a computer and with the repo open to more easily read the code samples and run them with a debugger to step through, otherwise, you will lose track of things. I sure did.

What's really something, though, is when Kopec takes an algorithm, say, depth-first search, and only changes the underlying data structure, from a stack to a queue, and changes nothing else, and suddenly you have a breadth-first search, or make the data structure priority queue and add a heuristic and you have A*. If I ever needed to implement these algorithms, I'd just borrow from this book's repo, as Kopec has written them to be very flexible.

My only qualm is I would have preferred the chapter on genetic algorithms to be replaced by a chapter on sorting algorithms, although I understand the inclusion somewhat. Also, his early section on fibonacci implementations is missing my favorite implementation (although you might want to `yield a` instead of `yield b` to start at 0), from [PEP 255](https://www.python.org/dev/peps/pep-0255/):

```python
def fib():
    a, b = 0, 1
    while 1:
       yield b
       a, b = b, a+b
```

Other than that, this book is a great skim of some prominent algorithms and worth the read. You mileage may vary, however, with how you might tolerate type hints, especially ones that make the code in the book near illegible.

{% include ratings.html rating=4%}