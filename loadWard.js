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
    quaver: "assets/characters/quaver.gif",
    cockatiel: "assets/characters/cockatiel.gif",
    hospitalchair: "assets/characters/hospitalchair.png",

    exit: "assets/characters/exit.png",
    locked: "assets/characters/locked.png"
}

const bgs = {
    betaward: "./assets/bgs/betaward.gif",
    blissful: "./assets/bgs/blissful-borders.png",
    rdrts_1: "./assets/bgs/rdrts_1_full.png",
    hospital: "./assets/bgs/hospital.png",
    hospitalnight: "./assets/bgs/hospitalnight.png",
    gardennight: "./assets/bgs/gardennight.png"
}

function shorten(string) {
    return string.substring(0, 29).trim()+(string.length>29 ? '...' : '')
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

        // Set the character sprite if it's found in the list
        if(characters[level.character]){
            level.character = characters[level.character]
        }

        if(level.type === "level"){
            level_template.innerHTML = `
                <div class="level" id=${level.id}>
                    <div>
                        ${ level.isBoss ? '<span style="color:#f652a0">Boss</span>' : '' }
                        <br><br>
                        <span class="nickname">${level.nickname}</span>
                        <span class="levelname">${shorten(level.name)}</span>
                        <br>
                        <button class="pager selectPatient" id='copybutton-${level.id}'>Copy Link</button>
                        <br>
                        <br>
                        <div class="quote" id='quote-${level.id}'></div>
                    </div>
                    <img class="character" src="${level.character}">
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
                        <div class="quote" id='quote-${level.id}'></div>
                    </p>
                    <img class="character" src="${level.character}">
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
        item.addEventListener('mouseenter', () => {
            //todo: check if level is beaten and if so, display postquote instead
            item.querySelector(`#quote-${level.id}`).style.visibility = 'visible'

            const typewriter = new Typewriter(`#quote-${level.id}`, { delay: 45, cursor: '' })
            typewriter.typeString(level.prequote || '').start()
        })

        item.addEventListener('mouseleave', () => {
            item.querySelector(`#quote-${level.id}`).style.visibility = 'hidden'
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
    const root = document.querySelector(":root")
    wardObject.color ? root.style.setProperty('--wardcolour', wardObject.color) : root.style.setProperty('--wardcolour', '#8294e566') // Writing "color" hurts my soul
    wardObject.colour ? root.style.setProperty('--wardcolour', wardObject.colour) : root.style.setProperty('--wardcolour', '#8294e566') // repenting for my sins

    // ^ FIXME: Currently all ranks are set to B+, please use this for the demo!
    // & Actually, just ignore it for now. :shushing_face:

    // set the background (if it exists)
    if (wardObject.bg) {
        if (bgs[wardObject.bg]) {
            wardObject.bg = bgs[wardObject.bg]
        }
        document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('${wardObject.bg}')`
    } else {
        console.log("BG not found, using betaward!")
    }

    addWardToScreen(wardObject.data)
    return true
}
export default loadWard
