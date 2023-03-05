let txCounter = 0



export function Tx(gl, options) {
	let tx = gl.createTexture()
	let filter, pixels, bits
	tx.loc = txCounter // index in unit textures
	if(options!==undefined){
		tx.w = options.w || 8
		tx.h = options.h || 8
		tx.d = options.d || 8 // depth for 3d
		filter = options.filter || gl.NEAREST
		tx.bits = options.bits || 32
		tx.type = options.type || 'sampler2D'
		pixels = options.pixels ? options.pixels : null
		if(Number.isInteger(options.loc))
			tx.loc = options.loc
	}
	if(pixels){
		if(tx.bits == 32){
			pixels = new Float32Array(pixels)
		}
		else if(tx.bits == 8){
			pixels = new Uint8Array(pixels)
		}
	}


	gl.activeTexture(gl.TEXTURE0 + tx.loc)
	if(tx.type == 'sampler2D'){
		gl.bindTexture(gl.TEXTURE_2D, tx)
		// gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,tx.w,tx.h,0,gl.RGBA,gl.UNSIGNED_BYTE,null)

		if(tx.bits == 32)
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, tx.w, tx.h, 0, gl.RGBA, gl.FLOAT, pixels)
		else if(tx.bits==8)
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, tx.w, tx.h, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,filter)
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,filter)
		gl.generateMipmap(gl.TEXTURE_2D)
	} else if(tx.type == 'sampler3D'){
		gl.bindTexture(gl.TEXTURE_3D, tx)
		gl.texImage3D(gl.TEXTURE_3D,0,gl.RGBA32F,tx.w,tx.h,tx.d,0,gl.RGBA,gl.FLOAT,pixels)
		gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,filter)
		gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,filter)
		gl.generateMipmap(gl.TEXTURE_3D)
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.GL_MIRRORED_REPEAT)
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.GL_MIRRORED_REPEAT)
		gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.GL_MIRRORED_REPEAT)

		// gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,filter)
		// gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,filter)
		// gl.generateMipmap(gl.TEXTURE_3D)
	}
	if(options.src!==undefined){
		tx.image = new Image()
		tx.image.src = options.src
		tx.image.addEventListener('load', function(event) {
			tx.w = event.srcElement.width
			tx.h = event.srcElement.height
			gl.activeTexture(gl.TEXTURE0 + tx.loc)
			gl.bindTexture(gl.TEXTURE_2D, tx)
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tx.image)
			gl.generateMipmap(gl.TEXTURE_2D)
		});
	}
	txCounter++

	tx.generateMipmap = () => {
		gl.activeTexture(gl.TEXTURE0 + tx.loc)
		gl.bindTexture(gl.TEXTURE_2D, tx)
		gl.generateMipmap(gl.TEXTURE_2D)
	}

	return tx
}
