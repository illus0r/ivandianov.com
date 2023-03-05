import * as WTF from 'https://cdn.jsdelivr.net/npm/tweakpane@3.1.0/dist/tweakpane.min.js'

export let shdrPane = function(uf, opt){
	const pane = new Tweakpane.Pane();
	let paneOpt = {}
	for(let key of Object.keys(opt)){
		let value = opt[key]
		if(typeof value === 'number'){
			uf[key] = value
		}
		else if(typeof value === 'object'){
			uf[key] = value.val
			paneOpt = value
		}
		pane.addInput(uf, key, paneOpt);
	}
	return uf
}
