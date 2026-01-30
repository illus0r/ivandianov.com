---
title: Electrostatic particle interaction
date: 2022-11-21
progress: 1
draft: true
---

<!--autotranslate-->

So it all started when I began working on a commercial project where I needed to turn black-and-white videos into animated images made of dots. It came in handy that in the gen club, sleeping shared a link to similar work. There was a cat made of dots, and below it were links to the implementation. The implementation was like this:

First, all particles repel each other. This is electrostatic interaction. Second, they're attracted to white pixels of the video, meaning more particles gather where the image is bright.

By adjusting the repulsion and attraction coefficients, you can tune the interaction. If video attraction is strong, there will be particle clusters in bright areas, pushing each other. If you decrease it, particles will barely react to the video and fill the screen more or less evenly.

The remaining task was calculating interaction forces between particles. But there was a problem: there needed to be many particles. If there were few, we'd take each particle, measure distance to all others, and calculate interaction force using a formula, sum all these tiny forces to get the total force acting on the particle. And so for each particle. So if there were 10 particles, we'd need 100 distance measurements; if there were a thousand, millions of measurements. The number of measurements grows proportionally to the square of particles. That's very slow. If there are many particles, optimization was needed.

So I decided to sacrifice accuracy. First, I decided to take all particles and draw them on a texture. Put many dots on the texture where all these particles are, then reduce the resolution of this texture. This is very easily done with literally one line of code — it's called mipmapping.

Now instead of calculating distance from a particle to every other particle, I need to calculate distance from a particle to each pixel of this low-resolution texture. The thing is, where few dots hit a low-resolution pixel, we get a dim pixel; where many, a bright pixel. So we multiply pixel brightness by its area and get the charge spread across that pixel. If a pixel is far from our particle, we can simply assume its coordinates equal the center of that pixel — we discard information about the specific positions of all contained particles, averaging them.

And here's the trade-off: what pixel size to choose? That is, what resolution to make this texture? If resolution is high, there's good accuracy, but we'll have to calculate distance to many pixels, slowing execution. If we take large pixels, everything calculates quickly, but particles will fly randomly.

And here another property of mipmaps comes in handy. They're created as a batch, immediately for different sizes from one pixel up. We can then sample a pixel from the needed texture in this batch. If it's 0, we sample the original image; if it's 1, the image at half resolution, and so on down to one pixel.

All that remains is measuring distance to the center of this pixel. If it's large... if it's very close to our point, then this approximation of charges scattered across the pixel starts to noticeably affect things. And we have to reduce pixel size, decrease the level of detail, move toward zero down to the original image. Through experiments I found that we need the pixel size (of the reduced-resolution texture, measured in original texture pixels) to be about 5 times smaller than the distance from the particle to the center of that pixel.

Okay, this kind of worked, but worked poorly. All pixels jittered, and they kept spreading beyond screen edges — unclear if this was correct or not. So I made two additions. First, I started rendering particles to this texture not as a single pixel, but as a blurred spot of pixels. Such a blurred circle added smoothness, because if a particle ended up on the boundary of two squares, it would affect each of them, giving smoother interaction. And for particles flying off edges? I was helped by formulas — I don't remember what it's called — modular math or something. Basically, if we connect screen edges: right to left, top to bottom. That is, torus topology: if we go right, we come from left. So between two particles you can measure distance as if they're not on a screen rectangle, but on this torus. The formula is slightly different, adds a couple of conditions, but it's quite simple. This way we can calculate distance between pixels and also the vector from one pixel to another, accounting for them not being on a rectangle.

Earlier I talked about making mipmaps and sampling the texture where all particles are rendered, but we do the same with the video texture. We also turn it into a batch of reduced-resolution textures and sample them similarly, just with opposite sign on the coefficient: particles repel from the first but attract to the second.

And after these two changes, it suddenly started working. I couldn't believe my eyes — there was a qualitative leap and the animation became smooth, stopped jittering. Everything worked. I connected video not from a file, but through webcam, which also wasn't hard. And everything animated beautifully. I told the gen club about this thing, and immediately someone said it strongly resembles the Barnes-Hut algorithm. Apparently I don't know if it was one person or two, but it's an algorithm for solving n-body problems when many particles all interact with each other. Unfortunately I wasn't the discoverer of this algorithm — it was invented before I was born — but it was still nice to reinvent such a wheel.
