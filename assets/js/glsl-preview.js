(function () {
  const canvases = document.querySelectorAll('.glsl-canvas');
  if (!canvases.length) return;

  const VS = `#version 300 es
in vec2 a;
void main(){gl_Position=vec4(a,0,1);}`;

  const BLIT_VS = `#version 300 es
in vec2 a;
out vec2 uv;
void main(){uv=a*.5+.5;gl_Position=vec4(a,0,1);}`;

  const BLIT_FS = `#version 300 es
precision highp float;
uniform sampler2D tex;
in vec2 uv;
out vec4 o;
void main(){o=texture(tex,uv);}`;

  // twigl geekest 300 es snippets (from twigl/src/shader_snippet/noise.glsl)
  const SNIPPETS = `
#define F4 0.309016994374947451
float mod289(float x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
float permute(float x){return mod289(((x*34.)+1.)*x);}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise2D(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m; m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;
  vec3 h=abs(x)-.5;
  vec3 ox=floor(x+.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
float snoise3D(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec4 grad4(float j,vec4 ip){
  const vec4 ones=vec4(1.,1.,1.,-1.);
  vec4 p,s;
  p.xyz=floor(fract(vec3(j)*ip.xyz)*7.)*ip.z-1.;
  p.w=1.5-dot(abs(p.xyz),ones.xyz);
  s=vec4(lessThan(p,vec4(0.)));
  p.xyz=p.xyz+(s.xyz*2.-1.)*s.www;
  return p;
}
float snoise4D(vec4 v){
  const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);
  vec4 i=floor(v+dot(v,vec4(F4)));
  vec4 x0=v-i+dot(i,C.xxxx);
  vec4 i0;
  vec3 isX=step(x0.yzw,x0.xxx);
  vec3 isYZ=step(x0.zww,x0.yyz);
  i0.x=isX.x+isX.y+isX.z;
  i0.yzw=1.-isX;
  i0.y+=isYZ.x+isYZ.y;
  i0.zw+=1.-isYZ.xy;
  i0.z+=isYZ.z;
  i0.w+=1.-isYZ.z;
  vec4 i3=clamp(i0,0.,1.);
  vec4 i2=clamp(i0-1.,0.,1.);
  vec4 i1=clamp(i0-2.,0.,1.);
  vec4 x1=x0-i1+C.xxxx;
  vec4 x2=x0-i2+C.yyyy;
  vec4 x3=x0-i3+C.zzzz;
  vec4 x4=x0+C.wwww;
  i=mod289(i);
  float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);
  vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.))+i.z+vec4(i1.z,i2.z,i3.z,1.))+i.y+vec4(i1.y,i2.y,i3.y,1.))+i.x+vec4(i1.x,i2.x,i3.x,1.));
  vec4 ip=vec4(1./294.,1./49.,1./7.,0.);
  vec4 p0=grad4(j0,ip);
  vec4 p1=grad4(j1.x,ip);
  vec4 p2=grad4(j1.y,ip);
  vec4 p3=grad4(j1.z,ip);
  vec4 p4=grad4(j1.w,ip);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  p4*=taylorInvSqrt(dot(p4,p4));
  vec3 m0=max(.6-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.);
  vec2 m1=max(.6-vec2(dot(x3,x3),dot(x4,x4)),0.);
  m0=m0*m0; m1=m1*m1;
  return 49.*(dot(m0*m0,vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2)))+dot(m1*m1,vec2(dot(p3,x3),dot(p4,x4))));
}
float fsnoise(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}
float fsnoiseDigits(vec2 c){return fract(sin(dot(c,vec2(0.129898,0.78233)))*437.585453);}
vec3 hsv(float h,float s,float v){
  vec4 t=vec4(1.,2./3.,1./3.,3.);
  vec3 p=abs(fract(vec3(h)+t.xyz)*6.-vec3(t.w));
  return v*mix(vec3(t.x),clamp(p-vec3(t.x),0.,1.),s);
}
mat2 rotate2D(float r){return mat2(cos(r),sin(r),-sin(r),cos(r));}
mat3 rotate3D(float angle,vec3 axis){
  vec3 a=normalize(axis);
  float s=sin(angle),c=cos(angle),r=1.-c;
  return mat3(a.x*a.x*r+c,a.y*a.x*r+a.z*s,a.z*a.x*r-a.y*s,
              a.x*a.y*r-a.z*s,a.y*a.y*r+c,a.z*a.y*r+a.x*s,
              a.x*a.z*r+a.y*s,a.y*a.z*r-a.x*s,a.z*a.z*r+c);
}
const float PI=3.141592653589793;
const float PI2=PI*2.;
`;

  function makeFS(code) {
    return `#version 300 es
precision highp float;
uniform vec2 r;
uniform float t;
uniform vec2 m;
uniform float f;
uniform sampler2D b;
out vec4 o;
${SNIPPETS}
void main(){
vec2 FC=gl_FragCoord.xy;
o=vec4(0.,0.,0.,1.);
${code}
}`;
  }

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
      console.warn('GLSL:', gl.getShaderInfoLog(sh));
    return sh;
  }

  function link(gl, vs, fs) {
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    return prog;
  }

  function makeFBO(gl, w, h) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { tex, fbo };
  }

  function resizeFBO(gl, fbo, w, h) {
    gl.bindTexture(gl.TEXTURE_2D, fbo.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  }

  function initCanvas(canvas) {
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) return null;

    const prog = link(gl, VS, makeFS(canvas.dataset.glsl));
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('Link:', gl.getProgramInfoLog(prog));
      return null;
    }

    const blitProg = link(gl, BLIT_VS, BLIT_FS);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    function bindQuad(p) {
      const a = gl.getAttribLocation(p, 'a');
      gl.enableVertexAttribArray(a);
      gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    }

    gl.useProgram(prog); bindQuad(prog);
    gl.useProgram(blitProg); bindQuad(blitProg);

    return {
      gl, prog, blitProg,
      rLoc: gl.getUniformLocation(prog, 'r'),
      tLoc: gl.getUniformLocation(prog, 't'),
      mLoc: gl.getUniformLocation(prog, 'm'),
      fLoc: gl.getUniformLocation(prog, 'f'),
      bLoc: gl.getUniformLocation(prog, 'b'),
      blitTexLoc: gl.getUniformLocation(blitProg, 'tex'),
      fbos: [makeFBO(gl, 1, 1), makeFBO(gl, 1, 1)],
    };
  }

  // Global mouse state, normalized to screen [0,1]
  const mouse = { x: 0, y: 0 };
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = 1.0 - e.clientY / window.innerHeight;
  });

  const state = new Map();

  function startLoop(canvas) {
    const s = state.get(canvas);
    if (s.raf) return;
    function draw(now) {
      if (!s.t0) s.t0 = now;
      const { gl, prog, blitProg, rLoc, tLoc, mLoc, fLoc, bLoc, blitTexLoc, fbos } = s;
      const w = canvas.clientWidth | 0;
      const h = canvas.clientHeight | 0;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
        resizeFBO(gl, fbos[0], w, h);
        resizeFBO(gl, fbos[1], w, h);
      }
      const fi = s.frame;
      const readFBO = fbos[fi % 2];
      const writeFBO = fbos[1 - fi % 2];

      gl.useProgram(prog);
      gl.bindFramebuffer(gl.FRAMEBUFFER, writeFBO.fbo);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, readFBO.tex);
      gl.uniform1i(bLoc, 0);
      gl.uniform2f(rLoc, w, h);
      gl.uniform1f(tLoc, (now - s.t0) / 1000);
      gl.uniform2f(mLoc, mouse.x, mouse.y);
      gl.uniform1f(fLoc, fi);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.useProgram(blitProg);
      gl.bindTexture(gl.TEXTURE_2D, writeFBO.tex);
      gl.uniform1i(blitTexLoc, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      s.frame++;
      s.raf = requestAnimationFrame(draw);
    }
    s.raf = requestAnimationFrame(draw);
  }

  function stopLoop(canvas) {
    const s = state.get(canvas);
    if (!s?.raf) return;
    cancelAnimationFrame(s.raf);
    s.raf = null;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const canvas = entry.target;
      if (entry.isIntersecting) {
        if (!state.has(canvas)) {
          const ctx = initCanvas(canvas);
          if (!ctx) return;
          const s = { ...ctx, raf: null, t0: null, frame: 0 };
          state.set(canvas, s);
        }
        startLoop(canvas);
      } else {
        stopLoop(canvas);
      }
    });
  });

  canvases.forEach(c => observer.observe(c));
})();
