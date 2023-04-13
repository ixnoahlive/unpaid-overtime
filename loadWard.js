import RDAudio from './audio.js'

const characters = {
    hailey: "assets/characters/hailey.gif",
    insom: "assets/characters/insom.gif",
    insomalt: "assets/characters/insomalt.gif",
    ianbubble: "assets/characters/ianbubble.gif",
    logan: "assets/characters/logan.gif",
    lucia: "assets/characters/lucia.gif",
    mystery: "assets/characters/mystery.gif",
    samurai: "assets/characters/samurai.gif",
    cole: "assets/characters/cole.gif",
    hospitalchair: "assets/characters/hospitalchair.png",

    exit: "assets/characters/exit.png"
}

const bgs = {
    betaward: "./assets/bgs/betaward.gif",
    blissful: "./assets/bgs/blissful-borders.png",
}

/**
 * Loads a ward
 * @param {array} ward_data 
 */
function addWardToScreen(ward_data) {
    const allLinks = []

    // Generate the content shared between all wards
    const ward_template = document.querySelector('#custom-ward')
    document.body.appendChild(ward_template.content)

    // Configure the buttons
    const master = document.querySelector('.master')

    master.querySelector('#exitWard').addEventListener('click', () => {
        RDAudio.TransitionIn.play()
        setTimeout(() => { window.location = window.location.href.split('?')[0] }, 1200)
    })

    master.querySelector('#copyAll').addEventListener('click', () => {
        navigator.clipboard.writeText(allLinks.join('\n'))
    })

    // Generate each level within the ward
    for (const level of ward_data) {
        const level_template = document.createElement('template')

        if(level.type === "level"){
            level_template.innerHTML = `
                <div class="level" id=${level.id}>
                    <p>
                        ${ level.isBoss ? '<span style="color:#f652a0">Boss</span><br><br>' : '' }
                        <span class="nickname">${level.nickname}</span>
                        <span class="levelname">${level.name}</span>
                        <br>
                        <button class="pager selectPatient" id='copybutton-${level.id}'>Copy Link</button>
                        <br>
                        <br>
                        <span class="quote" id='prequote-${level.id}'>${level.prequote || ''}</span>
                        <span class="quote" id='postquote-${level.id}'>${level.postquote || ''}</span>
                    </p>
                    <img class="character" src="${characters[level.character]}">
                </div>
            `
            master.querySelector('.levels').appendChild(level_template.content)

            master.querySelector(`#copybutton-${level.id}`).addEventListener('click', () => {
                navigator.clipboard.writeText(level.download)
            })

            allLinks.push(level.download)
        } else if (level.type === "exit"){
            level_template.innerHTML = `
                <div class="level" id=${level.id}>
                    <p>
                        <br>
                        <button class="pager selectPatient" id='exitbutton-${level.id}'>${level.name}</button>
                        <br>
                        <br>
                        <span class="quote" id='prequote-${level.id}'>${level.prequote || ''}</span>
                        <span class="quote" id='postquote-${level.id}'>${level.postquote || ''}</span>
                    </p>
                    <img class="character" src="${characters[level.character]}">
                </div>
            `
            master.querySelector('.levels').appendChild(level_template.content)
            
            master.querySelector(`#exitbutton-${level.id}`).addEventListener('click', () => {
                RDAudio.TransitionIn.play()
                setTimeout(() => { window.location = "?ward=" + level.destination }, 1200)
            })
        }

        // Configure the quotes
        const item = master.querySelector(`#${level.id}`)
        item.addEventListener('mouseover', () => {
            //todo: check if level is beaten and if so, display postquote instead
            item.querySelector(`#prequote-${level.id}`).style.display = 'initial'
        })

        item.addEventListener('mouseout', () => {
            item.querySelectorAll('.quote').forEach(quote => quote.style.display = 'none')
        })
    }

    // Apply SFX to all configured elements
    Array.from(master.querySelectorAll('.selectPatient')).map(elem => elem.addEventListener('mouseover', () => {
        RDAudio.SelectPatient.play()
    }))

    Array.from(master.querySelectorAll('.pager')).map(elem => elem.addEventListener('click', () => {
        RDAudio.PagerButton.play()
    }))
}

/**
 * Loads a ward
 * @param {object} wardObject
 */
async function loadWard(wardName) {
    let wardObject

    try {
        wardObject = await (await fetch(`./wards/custom/${wardName}.json`)).json()
    }
    catch(error) {
        console.log(error)
        alert('Attempted loading a malformed ward. Please check if this ward exists and is correctly formatted.')
        return false
    }

    let bgmSettings = localStorage.getItem('playBgm')
    if (bgmSettings) {
        const bgm = new Audio(`./assets/music/track1.mp3`)
        bgm.volume = 0.25
        bgm.loop = true
        bgm.play() //du dudududu  dudu    dudududu
    }

    // Update the page title
    document.title = wardObject.name

    // ^ FIXME: Currently all ranks are set to B+, please use this for the demo!
    // & Actually, just ignore it for now. :shushing_face:

    // set the background (if it exists)
    if (!wardObject.bg) {
        console.log("BG not found, using betaward!")
        wardObject.bg = 'betaward'
    }

    document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('${bgs[wardObject.bg]}')`

    addWardToScreen(wardObject.data)
    return true
}
export default loadWard
