import RDAudio from './audio.js'

function loadWard(wardObject) {
    if (localStorage.getItem('playBgm')!==false) {
        const bgm = new Audio('../../assets/music/track1.mp3')
        bgm.volume = 0.25
        bgm.loop = true
        bgm.play() //du dudududu  dudu    dudududu
    }
    if (wardObject.name && wardObject.data) {
        // Update the page title
        document.title = wardObject.name

        let allLinks = []

        // Create DIVs to contain level display
        const master = document.createElement('div')
        master.classList.add('master')

        const levelsDiv = document.createElement('div')
        levelsDiv.classList.add('levels')

        // Loop through all levels
        // ^ FIXME: Currently all ranks are set to B+, please use this for the demo!
        // & Actually, just ignore it for now. :shushing_face:

        wardObject.data.forEach((level) => {
            const levelDiv = document.createElement('div')
            levelDiv.classList.add('level')
            levelDiv.setAttribute('id', level.id)

            const levelInfo = document.createElement('p')

            if (level.type=="exit") { 
                levelDiv.classList.add('exitlevel')

                levelInfo.innerHTML = `<a href="#">Exit Ward</a><br><button>Copy All</button>`

                levelInfo.firstChild.addEventListener('click', () => {
                    RDAudio.TransitionIn.play()
                    setTimeout(()=>{window.location = "../../"}, 1200)
                })

                levelInfo.lastChild.addEventListener('click', () => {
                    navigator.clipboard.writeText(allLinks.join('\n'))
                    RDAudio.PagerButton.play()
                })

                levelInfo.lastChild.addEventListener('mouseover', () => {RDAudio.SelectPatient.play()})

                levelDiv.appendChild(levelInfo)
                return levelsDiv.appendChild(levelDiv) 
            }

            allLinks.push(level.download)

            levelInfo.innerHTML = `${level.isBoss ? '<span style="color:#f652a0">Boss</span><br><br>' : ''} <span class="nickname">${level.nickname}</span> <span class="levelname">${level.name}</span><br><button id='copybutton-${level.id}'><span>Copy Link</span></button>`
            levelInfo.lastChild.addEventListener('click', () => {
                RDAudio.PagerButton.play()
                navigator.clipboard.writeText(level.download)
            })
            levelInfo.lastChild.addEventListener('mouseover', () => RDAudio.SelectPatient.play())

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