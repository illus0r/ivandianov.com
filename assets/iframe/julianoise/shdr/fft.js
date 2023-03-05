export function FFT(size) {
	let isReady = false
	let analyser
	let bufferLengthAlt 

	console.log('Click to start FFT')
	document.addEventListener('click', init)

	function init() {
		document.removeEventListener('click', init);
		var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		var source;
		analyser = audioCtx.createAnalyser()
		analyser.fftSize = size
		bufferLengthAlt = analyser.frequencyBinCount;
		analyser.minDecibels = -90;
		analyser.maxDecibels = -10;
		analyser.smoothingTimeConstant = 0.85;

		if (navigator.mediaDevices.getUserMedia) {
			let constraints = { audio: true }
			navigator.mediaDevices.getUserMedia(constraints)// ← 0
				.then(
					function (stream) {
						source = audioCtx.createMediaStreamSource(stream);
						source.connect(analyser);
						isReady = true
					})
				.catch(function (err) { console.error(err); })
		} else {
			console.log('getUserMedia not supported on your browser!');
		}
	}


	this.get = function () {
		if (!isReady){
			return Array(size).fill(0)
		}

		let dataArrayAlt = new Uint8Array(bufferLengthAlt);
		analyser.getByteFrequencyData(dataArrayAlt);
		return [...dataArrayAlt].map(x => x / 255)
	}
}
