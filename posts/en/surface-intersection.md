---
title: Surface intersection
date: 2022-02-17 11:05:00
draft: true
progress: 5
---

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
![](/assets/media/23f58a73-c8df-4f48-8e8e-8414edffdc35.gif)
---