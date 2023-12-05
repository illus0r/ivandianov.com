import './third_party/webm-writer-0.2.0.js'
import './third_party/CCapture.js'
export function Capture(canvas, options) {
	canvas = canvas || document.querySelector('canvas')
	options = options || {}
	options.format = options.format || 'webm'
	options.frames = options.frames || Infinity
	options.autrostart = options.autrostart || false
	let frameCount = 0

	let isRecording = false
	let capturer
	capturer = new CCapture( options );
	console.log('capturer:',capturer)

	document.addEventListener('start', e => { 
		if(options.autrostart){
			this.start() // FIXME stops the anim
		}
	})

	this.start = () => {
		console.log('Recording…')
		capturer.start()
		isRecording = true // just in case
		frameCount = 0
	}

	this.save = () => {
		console.log('Saving…')
		capturer.stop();
		capturer.save();
		isRecording = false // just in case
	}

	document.addEventListener('keydown', e => { 
		if(e.key=='r'){
			isRecording = !isRecording
			if(isRecording){
				this.start()
			}
			else{
				this.save()
			}
		}
	})

	document.addEventListener('frame', e => { 
		// console.log(e.detail.frame)
		if(isRecording){
			if(frameCount >= options.frames){
				console.log('Capture frame limit is reached')
				this.save()
			}
			else {
				capturer.capture(canvas)
			}
		}
		frameCount++
	})
}
