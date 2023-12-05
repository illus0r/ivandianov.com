import {Uf} from './uf.js'

export function Pr(gl, fsStr, vsStr) {
	this.gl = gl
	if(vsStr === undefined){
		vsStr = `#version 300 es
			in vec4 a_p;
			void main(){
					gl_Position = vec4(-1,-1,0,1);
					if(gl_VertexID==1)gl_Position = vec4(3,-1,0,1);
					if(gl_VertexID==2)gl_Position = vec4(-1,3,0,1);
			}`
	}
	if(fsStr === undefined){
		fsStr = `#version 300 es
			precision highp float;
			uniform sampler2D tx;
			uniform vec2 res;
			uniform float time;
			out vec4 o;
			void main(){
				vec2 uv = gl_FragCoord.xy/res;
				o = texture(tx,fract(uv));
				// o.a=1.;
			}`
	}
	let vs = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vs,vsStr)
	gl.compileShader(vs)
	let vsEr = gl.getShaderInfoLog(vs); vsEr !== "" && console.log(vsEr)

	let fs = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fs,fsStr)
	gl.compileShader(fs)
	let fsEr = gl.getShaderInfoLog(fs); fsEr !== "" && console.log(fsEr)

	let pr = gl.createProgram()
	gl.attachShader(pr,vs)
	gl.attachShader(pr,fs)
	gl.linkProgram(pr)
	
	pr.draw = (target) => {
		if(target===null || target === undefined){
			gl.useProgram(pr)
			gl.bindFramebuffer(gl.FRAMEBUFFER, null)
			gl.viewport(0,0,gl.canvas.width, gl.canvas.height)
			gl.drawArrays(gl.TRIANGLES,0,3)
		}
		else if(Array.isArray(target)){
			// target is a list of textures
			let textures = target
			gl.useProgram(pr)
			let fb = gl.createFramebuffer()
			gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
			let w=textures[0].w, h=textures[0].h // all textures sizes are expected to match
			textures.forEach((tx,i)=>{
				gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0+i,gl.TEXTURE_2D,tx,0)
			})
			gl.drawBuffers(textures.map((d,i)=>gl.COLOR_ATTACHMENT0+i)) // list all attachments
			gl.viewport(0,0,w,h)
			gl.drawArrays(gl.TRIANGLES,0,3)
			gl.deleteFramebuffer(fb)
		}
		else { // target is texture
			gl.useProgram(pr)
			let tx = target
			// make fb
			let fb = gl.createFramebuffer()
			gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
			gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tx,0)
			gl.viewport(0,0,tx.w,tx.h)
			gl.drawArrays(gl.TRIANGLES,0,3)
			gl.deleteFramebuffer(fb)
			// gl.clearColor(1,0,0,1)
			// gl.clear(gl.COLOR_BUFFER_BIT)
		}
	}

	pr.setUf = (uf) => {
		gl.useProgram(pr)
		let loc = gl.getUniformLocation(pr,uf.name)
		uf.setGlUniform(gl,loc,uf.value) // value for sampler2d is a JS texture object
	}

	pr.ufs = {}
	pr.uf = (ufs) => {
		gl.useProgram(pr)
		for(let key of Object.keys(ufs)){
			if(key in pr.ufs){
				pr.ufs[key].value = ufs[key]
			}
			else {
				pr.ufs[key] = Uf(key, ufs[key])
			}
			let loc = gl.getUniformLocation(pr, pr.ufs[key].name)
			pr.ufs[key].setGlUniform(gl,loc,pr.ufs[key].value) // value for sampler2d is a JS texture object
		}
	}
	return pr
}
