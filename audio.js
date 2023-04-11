const PagerButton = new Audio('../../../assets/sounds/sndPagerButton.mp3')
PagerButton.volume = 0.18

const SelectPatient = new Audio('../../../assets/sounds/sndSelectPatient.mp3')
SelectPatient.volume = 0.1

const TransitionIn = new Audio('../../../assets/sounds/sndTransitionIn.mp3')
TransitionIn.volume = 0.23

console.log('Not found errors are caused by a system we use, don\'t worry about them! :D')

let RDAudio = { PagerButton, SelectPatient, TransitionIn }
export default RDAudio 