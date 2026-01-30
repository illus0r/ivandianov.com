---
title: Voxel raymarching
date: 2023-02-18
progress: 1
---

<!--autotranslate-->


Plan of what will appear here:

- Classic voxel marching
- Hybrid, with SDF inside voxels
- Acceleration using mipmaps
- Acceleration using jump flooding

I assume you're already familiar with the raymarching algorithm; if not, [watch this video](https://www.youtube.com/watch?v=PGtv-dBi2wE)

## Classic voxel marching

Unlike raymarching, where step length depends on distance to the nearest object, here space is divided into cubic cells, like graph paper. And each step along the ray goes from voxel to voxel. Stepping into a voxel, we check if it's full or empty. If full — we stop, we've hit an object, no need to march further.

To understand how 3D voxel marching works, it's better to start with 2D. And even better — start with 1D.

Here it is, our 2D space. We'll cast a ray from point 0, let's say the camera is there. The ray will fly right, will keep flying until it finds a filled ~~voxel~~ segment.


<iframe src="https://editor.p5js.org/illus0r/full/_Ln1BsDwd" width=400 height=444></iframe>

Unfinished sketch for the 2D case {: .caption}


## Acceleration using SDF texture

A simpler and seemingly more reliable way is to pre-make a voxel map. Each empty voxel in it will know the distance to the nearest non-empty one.

Can be calculated using [jump flooding](https://t.me/ivandianov/487).

If before we moved along the ray no more than one voxel at a time, now we can check the SDF texture and, if the nearest voxel is far, step more boldly.

For example, this image

![](/assets/media/2023-02-23-20-25-01.jpg)

has this SDF:

<video controls muted loop autoplay><source src="/assets/media/voxel-marching-sdf.mp4" type="video/mp4"></video>

Actually I use a 2D texture to store it. To make this work, I slice the volumetric map into horizontal one-voxel layers and lay them left to right. The result is a texture with height voxSize and width voxSize²

![](/assets/media/2023-02-23-21-02-58.png)
This isn't `<hr>`, it's a narrow image{: .caption}

As you can see, you can barely see anything. Too small. Zooming in on a piece:

![](/assets/media/2023-02-23-21-04-28.png)
