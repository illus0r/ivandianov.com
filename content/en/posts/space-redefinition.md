---
title: Space redefinition
date: 2022-07-06
progress: 1
---

<!--autotranslate-->

<!-- Awesome technique, really dig it. The more I experiment with it, the more cool tricks appear.

What do these lines have in common?

p=p.zxy;
p=vec3(length(p.yx),atan(p.y,p.x)/6.28,p.z);
p=vec3(noise(p),noise(p+1.),noise(p+2.));

Right, they're all complex and blow your mind. Po

Actually we've uncovered a fundamental layer of SDF understanding and are now approaching enlightenment.

Because the whole point of SDF is a simple thing: vec3 → float. It's just a way of getting a one-dimensional vector from a multidimensional one. Doesn't matter if it happens through gradual dimensionality reduction or we collapse all three dimensions into one at the very end.

Say we wrote an SDF that draws a cylinder going along the y-axis -->




<!-- Space transformation — replacing vector components with an arbitrary SDF. Say we have two functions making cylinders, the first cylSmall draws a thin cylinder along the y-axis length(p.xz)-.5, the other cylLarge — a thick cylinder along the z-axis: length(p.xy)-2.;

Space redefinition would be a transformation that uses one of these SDFs instead of one of the vector components: -->

For axis redefinition, only its past value can be used p.x = p.x - 1.; Or a more complex formula depending on several vector components: p.x = length(p.xyz) - 4.;

Sometimes you need to transform two vector components at once. For example, to convert to polar coordinates, p.x needs to get length(p.xy)-4. and p.y needs atan(p.y,p.x)/(PI*2.). And both these formulas depend on both p.y and p.x, meaning both values must be computed simultaneously. Otherwise changing one component of p, say p.x, would affect the subsequent computation of p.y. Fortunately in GLSL you can perform two transformations simultaneously:

p.xy = vec2(length(p.xy)-4., atan(p.y,p.x)/(PI*2.));

p.x = cylLarge(p);
return cylSmall(p);
https://bit.ly/3NNfiUT

We're essentially saying: changes in cylLarge value now pretend to be changes in p.x;
