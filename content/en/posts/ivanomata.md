---
title: Ivanomata — cellular automata with increasing resolution
date: 2022-11-21
progress: 3
---

<!--autotranslate-->

![](/assets/media/2022-11-26-15-22-41.png)

Ivanomata are cellular automata with increasing resolution. Apparently, these didn't exist before, so I named them after myself. If you've seen something similar<!-- before November 2021-->, let me know and I'll rename them.

One night I was reading the book "The Algorithmic Beauty of Plants" <!--about L-systems. Turns out they were invented by biologist Aristid Lindenmayer to describe plant structure, the letter L is from his surname. And they differ from Chomsky's generative grammars in that all rules are applied to tokens simultaneously. Just like in shaders. But Chomsky's rules apply sequentially, like in JS. Shock. It turned out--> and realized that cellular automata are a special case of context-sensitive L-systems! And for two years I'd tried and couldn't figure out how to make generative grammars two-dimensional.

I was so inspired that the next morning I wrote a prototype.

## How it works

A cellular automaton needs rules by which cells change colors.


We only have two colors: ■ and □. To find a new cell color, we look at the color of the cell itself and its four neighbors. There are 32 possible combinations:

![](/assets/media/2022-11-26-13-59-46.png)

Each of these combinations is matched with a color to repaint the central cell — these are our rules. For example, like these:

![](/assets/media/2022-11-26-14-26-13.png)
This is one of 2<sup>32</sup> = 4,294,967,296 possible rule variants{: .caption}
<!-- https://editor.p5js.org/illus0r/sketches/myfquQUaF -->

The rest is simple. Take a 4×4 cell grid, randomly fill it with □ and ■.

Apply the rules, find new colors for each cell. Notice how the central cell of the shaded area used the matching rule to find its new color.

Finally, increase the grid resolution: divide each cell into four.

![](/assets/media/2022-11-26-15-11-26.png)
In the third picture it's unclear whether black cells divided or not. Trust me, they did. Not going to redo the picture. {: .caption}
<!-- https://www.figma.com/file/abzo0bhPE5EJIuaZtJgWEd/Untitled?node-id=2%3A404&t=XQ7fThdoqwVCctyV-0 -->

Repeat the procedure a few times. You'll get something like this:

![](/assets/media/ivanomata.gif){: style="width:512px;image-rendering: pixelated;"}

Or this:

![](/assets/media/ivanomata2.gif){: style="width:512px;image-rendering: pixelated;"}

<!-- https://bit.ly/3EDBkXq -->

Then you can create coloring rules, combine results from several automata with different rules, switch rules halfway through, overlay the picture on its previous iterations, have full-on fun!

<video controls muted loop preload="auto">
  <source src="/assets/media/ivanomata-oculus.mp4" type="video/mp4">
</video>


One downside: 3D ivanomata aren't nearly as cool.


<!-- To transform it, we need rules. They'll divide the original cell into 4 child cells and set colors for these quadrants based on colors of the original cell and its neighbors. Unlike Conway's Game of Life, we'll only consider 4 neighboring cells (if speaking formally, this is von Neumann neighborhood).

Another difference from Conway's is that for him the side where neighbors are doesn't matter. For us it does.

So life will follow rules:

    n0, n1, n2, n3, n4 → color
    ↑   ↑
    |   Colors of four neighbors
    |
    Own color

Results in this:
TODO


https://t.me/ivandianov/264

If processing 8 neighboring cells (Moore neighborhood) instead of 4 (von Neumann neighborhood).

Results in lots of fine debris, reverted for now.



Thus, the number of cells at each step will increase by 4 times.

How many different rules are possible if a cell can be either alive or dead?

To define rules, we need to enumerate all possible variants of the right side. Turns out we need to write

2 * 2 * 2 * 2 * 2 = 32 lines like

    0, 0, 0, 0, 0 → 0
    0, 0, 0, 0, 1 → 1
    0, 0, 0, 1, 0 → 1
    0, 0, 0, 1, 1 → 1
    0, 0, 1, 0, 0 → 0
    0, 0, 1, 0, 1 → 0
    0, 0, 1, 1, 0 → 1
    …

If we enumerate all possible variants of the right side of such a ruleset (left always stays the same), we get 2**32 = 4,294,967,296 variants. Many. There will be boring variants that always produce empty or full cells, but probability of hitting them is very low.

Seems fine. All that's left is repeating cell division a few more times, admiring the emerging picture.

Todo: animate more smoothly, not like now.

https://bit.ly/3GSOjVz -->

<!-- ---


https://t.me/ivandianov/448

Resurrecting ivanomata, maybe something cool will come out.

For them, with help from Stranger and a webgl tutorial, made a mini-framework.

Main feature of the framework — no bundlers needed! No parcel, no god forbid webpack, not even dino. Just js files.

Seems like I spent as much time fighting build systems (writing configs, fixing version errors, etc etc etc) as on useful code.

How nice to be a downshifter: just open in browser and it just works. -->
