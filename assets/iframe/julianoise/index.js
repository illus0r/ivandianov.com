"use strict";

import {loadText} from './shdr/loadText.js'
import {Gl} from './shdr/gl.js'
import {Pr} from './shdr/pr.js'
import {Tx} from './shdr/tx.js'
import {rsz} from './shdr/rsz.js'

let isPlaying = true
let rndjs=[...Array(4)].map(_=>[fxrand()])
let mouse = [.5, .5];
// let paletteId = fxrand()*palettes.length | 0
let palette = [ "#000001", "#1D2B52", "#7E2552", "#008750", "#AB5235", "#5F574E", "#C2C3C8", "#FFF1E7", "#FF014D", "#FFA300", "#FFEC28", "#01E435", "#30ADFF", "#83769D", "#FF77A7", "#FFCCAB",// 	'#1A1C2C', '#5D275D', '#B13E53', '#EF7D57', '#FFCD75', '#A7F070', '#38B764', '#257179', '#29366F', '#3B5DC9', '#41A6F6', '#73EFF7', '#F4F4F4', '#94B0C2', '#566C86', '#333C57',
].sort(_=>fxrand()-.5).slice(0,5)
palette = palette.map(color => {
  color = color.slice(1)
  color = color.match(/(.{2})/g).map(v=>Number("0x"+v)/255)
  return color
})
// palette=palette.flat()
console.log('palette:',palette)

let gl = new Gl('canvas')

let fsStr = `#version 300 es
precision highp float;
uniform sampler2D tx;
uniform sampler2D tx_rul;
uniform float frame;
uniform float pass;
uniform float time;
uniform vec2 res;
uniform vec2 mouse;
uniform float rndjs[4];
out vec4 o;

#define c(r,i) mat2(r,i,-(i),r)
#define c2(v) mat2(v,-(v).y,(v).x)
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

float noise(vec2 uv){
	uv = abs(mod(uv,2.)-1.)-.5;
	mat2 z = c2(uv);
	mat2 a = c(-0.696, 0.136);
	float i;
	for(i=0.;i<5.;i++){
		z = inverse(z*z+a);
	}
	uv = z[0];
	uv = fract(uv-.5+time*.1)-.5;
	return length(uv)*sqrt(2.);
}

void main(){
	vec2 uv = (gl_FragCoord.xy*2.-res)/res.y*1.;

	vec2 uvI = uv;
	vec3 n;
	n.x = noise(uv)-.5;
	n.y = noise(uv*rot(3.14/4.))-.5;
	/* n.y = noise(uv+.1)-.5; */
	n.z = .2;
	n = normalize(n);

	vec3 l = normalize(vec3(0,.2,.5));
	o.rgb+=pow(max(dot(n, l),0.),200.);
	o.rgb+=pow(max(dot(n, l),0.),2.)*.5;
	/* o+=sin(o.r*80.)*.1; */

	o.a=1.;
	return;

	float j,d,E=1.;
	vec3 p;
	for(;j++<99.&&E>1e-3;){
		p=normalize(vec3(uv,1))*d;
		p.z-=time+uvI.x*.1;
		p=fract(p)-.5;
		d+=E=length(p)-.4;
	}
	o=vec4(3./j);

	o.a=1.;
}`
let pr = new Pr(gl,fsStr)
let prDr = new Pr(gl)

let u_tx=[]//.map(_=>new Tx(gl, tx_opt))
window.addEventListener('resize',resize, true)
window.dispatchEvent(new Event('resize'))

window.addEventListener('mousemove', e=>{
	let [w,h] = [gl.canvas.width, gl.canvas.height]
	mouse = [e.clientX/w*2-1, (1-e.clientY/h)*2-1]
	console.log('mouse:',mouse)
})

let timeInit=+new Date()
let timePrev=timeInit
let timeNew=timeInit
let u_frame=0


function frame() {// ← 6
	timePrev=timeNew
	timeNew=+new Date()
	let time = (timeNew-timeInit)/1000
	u_frame++

	let pos = [time*.5, time*.5]

	if(isPlaying && u_tx.length > 0){
		for(let i=0;i<10;i++){
			u_tx[0].generateMipmap()
			u_tx[1].generateMipmap()
			pr.uf({
				'time': time,
				'res': [u_tx[0].w,u_tx[0].h],
				'tx': u_tx[0],
				'frame': u_frame,
				'mouse': mouse,
				'rndjs': rndjs,
				'palette': palette,
			})
			pr.draw(u_tx[1])
			u_tx.reverse()
		}

		prDr.uf({
			'time': time,
			'res': [u_tx[0].w,u_tx[0].h],
			'tx': u_tx[0],
			'frame': u_frame,
			'rndjs': rndjs,
		})
		prDr.draw()
	}
	else{ 
		timeInit+=timeNew-timePrev
	}
	requestAnimationFrame(frame)
}
frame()

document.addEventListener('keydown', (event) => {
	if (event.code === 'Space') {
		isPlaying=!isPlaying
		return
	}
}, false)

function resize(){
	if(u_tx.length > 0){
		u_tx.forEach(tx=>gl.deleteTexture(tx))
	}
	let [w,h] = [innerWidth, innerHeight]
	rsz(gl,w,h)
	u_tx=[0,0].map((_,i)=>new Tx(gl, {w:w,h:h,loc:i,filter:gl.LINEAR_MIPMAP_LINEAR}))
}

function saveImage (e){
	let downloadLink = document.createElement('a');
	downloadLink.setAttribute('download', `${fxhash}.png`);
	// let canvas = document.getElementById('Canvas');
	let canvas = document.querySelector('canvas')
	canvas.toBlob(function(blob) {
		let url = URL.createObjectURL(blob);
		downloadLink.setAttribute('href', url);
		downloadLink.click();
	});
}
// save only if key S is pressed
document.addEventListener('keydown', e=>e.code=='KeyS'?saveImage():0)

