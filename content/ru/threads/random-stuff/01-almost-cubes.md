---
date: 2026-06-28
---

::: glsl editor collapsed
vec2 uv=(FC.xy*2.-r)/r.y*2.+1e-5;

uv.y*=sqrt(3.);
uv*=rotate2D(-PI*3./4.);
uv.y+=1.;

vec2 uvf=floor(uv);
//right
if(mod(floor(uv.x-uv.y)-uvf.y-1.,3.)==2.)
  {uv=fract(uv-vec2(uv.y,0)),
  uv = 1.-uv;
  ;}
//top
else if(mod(uvf.x+uvf.y+1.,3.)==0.){
  uv=fract(uv),
  uv=vec2(1.-uv.x, uv.y);}
else //front
{
  uv=fract(uv-vec2(0,uv.x));
}
o.rg = uv;
:::
