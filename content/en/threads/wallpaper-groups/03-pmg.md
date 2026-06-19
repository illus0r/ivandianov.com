---
title: "22* (pmg)"
date: 2026-06-18
---

<!--autotranslate-->

::: glsl
vec2 uv=(FC.xy*2.-r)/min(r.x,r.y)*3.+.001;
if(mod(floor(uv.y),2.)==0.){uv=1.-uv;}
uv.y=fract(uv.y);
uv.x=abs(fract(uv.x/2.)*2.-1.);
vec3 a=vec3(0,.85,.5),b=vec3(.9,0,.6),c=vec3(.95,.85,0);
o.rgb+=mix(mix(a,b,uv.x),c,uv.y*1.4);
:::

```glsl
vec2 uv=(FC.xy*2.-r)/min(r.x,r.y)*3.+.001;
if(mod(floor(uv.y),2.)==0.){uv=1.-uv;}
uv.y=fract(uv.y);
uv.x=abs(fract(uv.x/2.)*2.-1.);
vec3 a=vec3(0,.85,.5),b=vec3(.9,0,.6),c=vec3(.95,.85,0);
o.rgb+=mix(mix(a,b,uv.x),c,uv.y*1.4);
```

[Live demo on twigl.app](https://twigl.app?ol=true&ss=-OvRcVqLNvE_1hCF0-4-)
