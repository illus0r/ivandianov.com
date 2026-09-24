---
date: 2026-09-24
---

::: glsl editor collapsed
float i,d,e=1.;
vec2 uv = (FC.xy*2.-r)/r.y*8.;
vec3 p,pI,rd=normalize(vec3(vec2(.06*uv.x,-.1),1));
for(;i++<99.&&e>.001;){
  pI=p=rd*d+vec3(uv,0);
  p.z-=10.;
  p.y+=p.z*.3;
  p.x*=2.;
  p.y+=t;
  p.y = asin(sin(p.y)*.7);
  p.x = asin(sin(p.x)*.99);
  p.xy=rotate2D(.8)*p.xy;
  p.x*=6.;
  p.x+=0.;
  float l1 = length(p.x)+length(p.z);
  float l2 = length(p.xz);
  d+=e=abs(mix(l1,l2,m.x)-7.6)*.5;
}
o+=2./d;
:::
