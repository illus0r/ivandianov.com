---
caption: Online design tool for glitching images
cover: /assets/media/pixel-sort.jpg
span: 2
---

# PixelSort

Adam Arutyunov and I created a tool for glitching images. Adam developed the interface, and I wrote the shader that shuffles the pixels.

You don’t have to sort all the pixels at once — you can use a mask image. The boundaries on this image will stop the pixels, making the sorting uneven. An interesting effect is created if you use the same image both as a mask and as a source for sorting. You can also choose one of the suggested masks or upload your own.

For sorting, I didn’t use the slow bubble sort, but instead comb sort: this algorithm is not only faster but also creates a cool animation.

Try sorting your own photo on the website <a href="https://setka.design/pixelsort/">setka.design/pixelsort</a>

![](/assets/media/pixel-sort.jpg)
