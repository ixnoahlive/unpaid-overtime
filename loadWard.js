function loadWard(wardObject) {
    if (localStorage.getItem('playBgm')!==false) {
        const bgm = new Audio('../../assets/music/track1.mp3')
        bgm.volume = 0.25
        bgm.loop = true
        bgm.play() //du dudududu  dudu    dudududu
    }
    if (wardObject.name && wardObject.data) {
        // Update the page titlte
        document.title = wardObject.name

        // Create DIVs to contain level display
        const master = document.createElement('div')
        master.classList.add('master')

        const levelsDiv = document.createElement('div')
        levelsDiv.classList.add('levels')

        // Loop through all levels
        // ^ FIXME: Currently all ranks are set to B+, please use this for the demo!

        wardObject.data.forEach((level) => {
            const levelDiv = document.createElement('div')
            levelDiv.classList.add('level')
            levelDiv.setAttribute('id', level.id)

            const levelInfo = document.createElement('p')

            if (level.type=="exit") { levelDiv.classList.add('exitlevel') ; levelInfo.innerHTML = `<a href="#" onclick="const trans = new Audio('../../assets/sounds/sndTransitionIn.mp3');trans.volume=0.25;trans.play();setTimeout(()=>{window.location = '../../'},1200)">Exit this Ward</a>` ; levelDiv.appendChild(levelInfo) ; return levelsDiv.appendChild(levelDiv) }

            levelInfo.innerHTML = `${level.isBoss ? '<span style="color:#f652a0">Boss</span><br><br>' : ''} <span class="nickname">${level.nickname}</span> <span class="levelname">${level.name}</span><br><button onmouseenter="const SelectPatient = new Audio('../../assets/sounds/sndSelectPatient.mp3');SelectPatient.volume = 0.25;SelectPatient.play()" onclick="const CopyLink = new Audio('../../assets/sounds/sndPagerButton.mp3');CopyLink.volume = 0.25;CopyLink.play();navigator.clipboard.writeText('${level.download}')"><span>Copy Link</span></button>`
            levelDiv.appendChild(levelInfo)
            
            const charImg = document.createElement('img')
            charImg.src = level.character
            charImg.classList.add('character')
            levelDiv.appendChild(charImg)

            levelsDiv.appendChild(levelDiv)
            master.appendChild(levelsDiv)
        })

        // Add levels to page
        document.body.appendChild(master)
    } else {
        alert('Attempted loading a malformed ward. Please check if this ward is correctly formatted.')
    }
}
export default loadWard