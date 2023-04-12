const audioInfo = {
	PagerButton: { volume: 0.18 },
	SelectPatient: { volume: 0.1 },
	TransitionIn: { volume: 0.23 }
}

function parse(audioInfo) {
	const RDAudio = {}

	for (const [name, props] of Object.entries(audioInfo)) {
		RDAudio[name] = new Audio(`assets/sounds/snd${name}.mp3`)
		RDAudio[name].volume = props.volume
	}
	return RDAudio
}

let RDAudio = parse(audioInfo)
export default RDAudio
