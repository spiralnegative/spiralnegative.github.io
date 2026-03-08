---
layout: post
title:  "Generative art: Context Free"
date:   2020-04-20 11:26:00
disqus: true
categories: article
tags:
- programming
- generative art
---

Generative art, sometimes called algorithmic art, is [defined by Wikipedia](https://en.wikipedia.org/wiki/Generative_art) as "art that in whole or in part has been created with the use of an autonomous system (...) [which] can independently determine features of an artwork that would otherwise require decisions made directly by the artist". Back in my second year at university I studied **Grammars for Generative Art** which introduced its visual aspect to me. Many years have passed since then and I have only recently started experimenting with it again after browsing [/r/generative](https://www.reddit.com/r/generative/).

## Context Free
[Context Free](https://www.contextfreeart.org/index.html) is a digital art program that generates images from instructions in the form of **context free (design) grammar** called `cfdg` files. What a context free grammar typically does is to analyze a sentence of symbols to see if they can reduce to some root symbol. Here the symbol is a shape, composed of some number of primitive shapes (squares, circles, triangles and fills) and non-primitive shapes. A `cfdg` file consists of `startshape` and some number of `shape` rules. These rules provide information about the shape - colour, geometry (position, size, rotation and skew) and Z order (for overlapping shapes).

### Example 1
Here is an example of an image with two primitive shapes. The `startshape` is called `BRANCH` but you can use any name. Note that at least one `shape` with the same name should be provided, otherwise `Shape with no rules encountered` warning will be displayed. The two shapes are a triangle and a circle. The first one has **hue** equal to `160`, **brightness** `0.8` and **saturation** `1`. The second has **hue** `250`, **brightness** `1` and **saturation** `0.1` but it's also moved horizontally (**x**) by `2` and vertically (**y**) by `1`.

```
startshape BRANCH

shape BRANCH
{
  TRIANGLE [h 160 b 0.8 sat 1]
  CIRCLE [h 250 b 1 sat 0.1 x 2 y 1]
}
```
<img src="/assets/images/snowflake_1.png" class="center-image">

### Example 2
The example above demonstrates that rules tell Context Free how to draw a shape in terms of other shapes. When a shape is drawn, its rule is evaluated and the shape is replaced with the shapes listed in the rule. Each replacement has a state, relative to the state of the parent shape. This can be illustrated with a simple recursion. The `BRANCH` shape contains the triangle from the previous example and a call to the same `BRANCH` rule with parameters. On each call **size** changes by `0.9`, **y** by `-0.2`, **alpha** by `-0.2` and **hue** by `8`. Note that the order of the parameters does not change how the shape is drawn.

```
startshape BRANCH

shape BRANCH
{
  TRIANGLE [h 160 b 0.8 sat 1]
  BRANCH [s 0.9 y -0.2 a -0.2 h 8]
}
```

<img src="/assets/images/snowflake_2.png" class="center-image">

### Example 3
The next example shows how to define another shape, called `SNOWFLAKE` which calls the `BRANCH` shape `9` times while rotating it by `40`.

```
startshape SNOWFLAKE

shape SNOWFLAKE
{
  loop 9 [r (360/9)] BRANCH []
}

shape BRANCH
{
  TRIANGLE [h 160 b 0.8 sat 1]
  BRANCH [s 0.9 y -0.2 a -0.2 h 8]
}
```

<img src="/assets/images/snowflake_3.png" class="center-image">

### Bonus example
This was my course project for the **Grammars for Generative Art** course. This `565x565` image contains `39 942` shapes, using only circles. The code can be found in my [context-free-artwork](https://github.com/spiralnegative/context-free-artwork) repository.

<img src="/assets/images/cosmic_PIPHRD.png" class="center-image">

### Even more
The examples above show only a fraction of what you can achieve with Context Free. More detailed information about these and other features can be found in the [Wiki page](https://github.com/MtnViewJohn/context-free/wiki). You can also check the official [Context Free Gallery](https://www.contextfreeart.org/gallery) for many stunning images.


## Generative music
Music combined with live coding is another popular form of generative art but, unfortunately, I haven't experimented with it yet. Here are some amazing examples:
* [Repl Electric](https://www.youtube.com/watch?v=j0aLlv1UhCE)
* [Sam Aaron](https://www.youtube.com/watch?v=G1m0aX9Lpts)
