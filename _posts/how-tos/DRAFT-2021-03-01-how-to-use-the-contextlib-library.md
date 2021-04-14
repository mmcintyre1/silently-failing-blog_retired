---
title: how to use the contextlib library
categories:
  - how-tos
tags:
  - python
date: 2021-03-01-T22:10:09-05:00

toc: true
toc_label: table of contents
toc_icon: cog
toc_sticky: true

author-profile: true

excerpt: A walkthrough of how to use various utilities within the contextlib library.
---
## contextlib.suppress
Ever written this code?

```python
try:
    function_with_ignorable_error()
except TheIgnorableError:
    pass
else:
    keep_going()
```

We've all written an `except: pass` before, and it works perfectly fine. But what if there was a way to write the above in just two lines? Introducing the `contextlib` library, which is part of python's standard library.

## contextlib.closing

## contextlib.contextmanager
