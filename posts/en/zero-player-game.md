---
title: Zero-player game
url: /zero-player-game/
date: 2022-12-18 02:43:00
progress: 80
---

![](/assets/media/2022-11-26-15-22-41.png)

## Idea

"Zero-player game" is a work that combines the nostalgia of 8bit games with the complexity of tissues development. Its name speaks to the idea that complexity can emerge from simple things and rules.

It presents a new kind of cellular automata with increasing resolution.

## Ignition

One night I was reading a book "The Algorithmic Beauty of Plants" and realized that cellular automata are a special case of context-dependent L-systems! And for two years I tried and couldn't figure out how to make generative grammars two-dimensional.

I was so inspired that the next morning I wrote a prototype.

## How it works

A cellular automaton needs rules by which cells change colors!

We only have two colors: ■ and □. To find a new color of a cell, we see the color of the cell itself and its four neighbors. There are 32 possible combinations:

![](/assets/media/2022-11-26-13-59-46.png)
<!-- https://editor.p5js.org -->

Each of these combinations is matched with a color, in which we repaint the central cell: that will be our rules. For example, these are:

![](/assets/media/2022-11-26-14-26-13.png)
This is one of 2^32 = 4 294 967 296 possible rule variants{: .caption}
<!-- https://editor.p5js.org/illus0r/sketches/myfquQUaF -->

The rest is easy. We take a initial grid of 4×4 cells and randomly fill it with □ and ■.

Then for each cell we find a new color according to rules. Pay attention to how the central cell of the shaded area used the matching rule to find out its new color.

Finally, we increase the resolution of the grid by dividing each cell into four.

![](/assets/media/2022-11-26-15-11-26.png)
In the third picture, it's not clear if the black cells are divided or not. Believe me, they are! {: .caption}
<!-- https://www.figma.com/file/abzo0bhPE5EJIuaZtJgWEd/Untitled?node-id=2%3A404&t=XQ7fThdoqwVCctyV-0 -->.

Repeat this procedure a few times. You should get something like this:

![](/assets/media/ivanomata.gif){: style="width:512px;image-rendering: pixelated;"}

Or this:

![](/assets/media/ivanomata2.gif){: style="width:512px;image-rendering: pixelated;"}

<!-- https://bit.ly/3EDBkXq -->

Then you can make up coloring rules, combine different rules, switch the rules halfway through, overlay the picture on its previous less detaled iterations, and have all the fun you want!

<video controls>
  <source src="/assets/media/ivanomata-oculus.mp4" type="video/mp4">
</video>
<!-- 
## Going big

It's not possible  -->