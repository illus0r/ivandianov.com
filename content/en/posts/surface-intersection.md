---
title: Surface intersection
date: 2021-03-03 06:35:00
progress: 3
---

I've made this article out of my twitter thread [https://twitter.com/i_dianov/status/1367136469853351944](https://twitter.com/i_dianov/status/1367136469853351944)

![](/assets/media/2022-02-17-11-09-37.png)
Intersection of sphere with intersaction of gyroid and sphere {.caption}

Hey! This is a tutorial thread on how to find the intersection of two or more surfaces (not volumes) to make complicated #SDF shapes you can use for #raymarching.

---

1. Let's start with a basic raymarching setup

``` glsl
#define SPHERE length(p)-1.
#define SDF(p) SPHERE
vec3 p; float d=0.,i,e=1.; for(;i++<99.&&e>.01; p=d*normalize(vec3((FC.xy-.5*r)/r.y,1))+ vec3(0,0,-5), p*=rotate3D(t,vec3(.3,1,0)), d+=e=.5*SDF(p)); o+=100./i/i;
```
[https://bit.ly/3b9u7AL](https://bit.ly/3b9u7AL)
{.caption}

You don't need to understand the bottom line, let's just focus on the line starting with

```
#define SDF(p) …
```

It defines the shape to render. Here's a sphere:

```
#define SPHERE length(p)-1.
#define SDF(p) SPHERE
```

![](/assets/media/2022-02-17-11-07-46.png)

---

2. And here's an SDF for a plane Z (it's parallel to X- and Y-axis) [https://bit.ly/3e4nd1D](https://bit.ly/3e4nd1D)

```
#define PLANE_Z -p.z
#define SDF(p) PLANE_Z
```
![](/assets/media/surface-intersection-2.gif)

---

3. To find the intersection of these two surfaces we just do

```
#define SDF(p) length(vec2(PLANE_Z, SPHERE))
```

And BOOM!💥 The circle is here! https://bit.ly/3bXGTBJ

The thing is that `length` of two SDFs is close to zero only if both SDFs are close to zero.

![](/assets/media/surface-intersection-3.gif)

---

4. We can inflate this surface by subtracting a small value from the SDF:

```
#define SDF(p) length(vec2(PLANE_Z, SPHERE))-.2
```

Please, pay attention to terminal `-.2` in the formula.
https://bit.ly/3bXGTBJ

![](/assets/media/surface-intersection-4.gif)

---

5. Can you make a short break to think about how to make a cylinder using this trick?

---

6. Great, you did it! It's just an intersection of two planes inflated by subtracting a small value:

```
#define SDF(p) length(vec2(PLANE_X, PLANE_Z))-1.2
```

They often shorten this to just `length(p.xz)-1.2` which is effectively the same.

https://bit.ly/30me4cZ

![](/assets/media/surface-intersection-6.gif)

---

7. Let's intersect cylinders! It will result in two crossing circles

```
#define CYLINDER_Y length(vec2(PLANE_X, PLANE_Z))-1.2
#define CYLINDER_X length(vec2(PLANE_Y, PLANE_Z))-1.2
SPHERE))-.01
#define SDF(p) length(vec2(CYLINDER_Y, CYLINDER_X))-.1
```

https://bit.ly/3883WbT

![](/assets/media/surface-intersection-7.gif)

---

8. The crazy stuff begins! Beware gyroid

```
#define GYROID dot(sin(p*9.),cos(p.zxy*9.))*.1
#define SDF(p) GYROID
```

It is not easy to understand its shape because gyroid is borderless and we are inside https://bit.ly/3070hqe

![](/assets/media/surface-intersection-8.gif)

---

9. To understand its shape better we have to intersect it with some other primitive. Why not a sphere?

```
#define SDF(p) length(vec2(SPHERE, GYROID))-.02
```

https://bit.ly/30a2scU

You can learn more about gyroids on https://en.wikipedia.org/wiki/Gyroid

![](/assets/media/surface-intersection-9.gif)

---

10. You want to intersect intersections? No problem! We can use our weird shape from twit #7 for that:

```
#define CROSS_RINGS length(vec2(CYLINDER_Y, CYLINDER_X))-.2
#define SDF(p) length(vec2(CROSS_RINGS, GYROID))-.01
```

https://bit.ly/3kGYWjr

![](/assets/media/surface-intersection-10.gif)

---

11. You can intersect more than two surfaces at once! Use vec3 or vec4 for that:

```
#define SDF(p) length(vec3(CYLINDER_Y, CYLINDER_X, SPHERE))-.1
```

https://bit.ly/3uT3ZSu

![](/assets/media/surface-intersection-11.gif)

---

12. Aaaaannndddd… the regular sphere SDF is a shortcut of the very same formula!

```
#define SDF(p) length(vec3(PLANE_X, PLANE_Y, PLANE_Z))-.9
```
↓
```
#define SDF(p) length(p.xyz)-.9
```
↓
```
#define SDF(p) length(p)-.9
```

I was shocked to learn about it! 🤯

---

13. That's it! Try playing with the code, interesting patterns can suddenly appear https://bit.ly/3uSmvdO

It's my first tutorial thread. I would be grateful if you could share your thoughts on the subject, ask questions or brag about the SDFs you discover.

![](/assets/media/surface-intersection-13.gif)
