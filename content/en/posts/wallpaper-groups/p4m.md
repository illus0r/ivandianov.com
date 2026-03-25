---
title: "*442 (p4m)"
date: 2026-03-25
progress: 1
draft: false
parent: wallpaper-groups
---

<!--autotranslate-->

Square lattice with 4-fold rotation at cell centers and corners, plus mirror lines along diagonals and edges.

![p4m pattern](/posts/wallpaper-groups/p4m.jpg)

```glsl
vec2 uv = (FC.xy * 2. - r) / min(r.x, r.y) * 2.5;
uv = 1. - abs(fract(uv * .5) * 2. - 1.);
if (uv.y > uv.x) uv = uv.yx;
o.rg += uv.xy;
o *= step(.3, uv.y + uv.x);
o *= step(.04, uv.y);
```

[Live demo on twigl.app](https://twigl.app?ol=true&ss=-ONWf60-hHQkDPl4ZIQK)
