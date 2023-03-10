---
title: Circular random() for rarest traits
date: 2023-03-10 02:00:00
progress: 3
---

Imagine you want make a generative project. You want the work to have one of 8 traits and you make it like this:

```
let options=['🍒','🍓','🍇','🍎','🍋','🍍','🍏','🥥',]
let optionsIndex = Math.floor(Math.random() * options.length)
let trait = options[optionsIndex]
```

Then you run your script 100 times and record statistics.

```
let options = ["🍒", "🍓", "🍇", "🍎", "🍋", "🍍", "🍏", "🥥"];
let stats = Array(8).fill(0)
for (let i = 0; i < 100; i++) {
  let optionsIndex = Math.floor(Math.random() * options.length);
  let trait = options[optionsIndex];
  stats[optionsIndex] ++
}
for(let i=0;i<8;i++){
  console.log(options[i].repeat(stats[i]))
}
```

That's what you get:
<!-- https://editor.p5js.org/illus0r/sketches/EWUPWVhcC -->

```
🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒 
🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓 
🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇 
🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎 
🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋 
🍍🍍🍍🍍🍍🍍🍍🍍🍍🍍🍍 
🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏 
🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥🥥 
```
Apples got lucky this time {: .caption}

Then you decide you need coconuts to be more rare than cherries. No, you want coconuts to be the most rare trait in your project! One in hundreds! Therefore you modify your random function to squared random:

```
let optionsIndex = Math.floor(Math.random()**2 * options.length);
```

And you get this:

```
🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒 
🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓 
🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇 
🍎🍎🍎🍎🍎🍎🍎 
🍋🍋🍋🍋🍋🍋🍋🍋 
🍍🍍🍍🍍🍍🍍🍍🍍🍍 
🍏🍏🍏🍏🍏🍏 
🥥🥥🥥🥥🥥🥥🥥
```
Cherries are the most common now! Isn't it great? But wait, coconut was meant to be the rarest, but they are as rare as the bottom half of the list!

<!-- The thing is `Math.random()**2` near 1 is almost straight: -->

Let's see why it happens:

<iframe src="https://editor.p5js.org/illus0r/full/9Y3ioLqvt" width=400 height=444></iframe>

You see, the cherry area on the horizontal axis is huge, but coconut area is as wide as its neighbours.

Blame on parabola! We need a circle here:

<iframe src="https://editor.p5js.org/illus0r/full/UcT0w4H6r" width=400 height=444></iframe>

Pay attention, how tiny the coconut stripe is! Let's run the test again:

```
🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒 
🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓 
🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇 
🍎🍎🍎🍎🍎🍎🍎 
🍋🍋🍋🍋 
🍍🍍🍍🍍 
🍏🍏 
🥥
```
Circular random test results {: .caption}

We were lucky to get even one, there are no coconuts most of the time.

We did it, hooray. That's a wrap.

