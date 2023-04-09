import RDAudio from './audio.js'

const characters = {
    hailey: "../../assets/characters/hailey.gif",
    logan: "../../assets/characters/logan.gif",
    samurai: "../../assets/characters/samurai.gif",
    cole: "../../assets/characters/cole.gif",
}

const bgs = {
    betaward: "../../assets/bgs/betaward.gif",
    blissful: "../../assets/bgs/blissful-borders.png",
}

/**
 * Loads a ward
 * @param {array} ward_data 
 * @param {boolean} isMiddlesea Reserved for official content, breaks community creations.. 
 */
function addWardToScreen(ward_data, isMiddlesea) {
    const allLinks = []

    // Generate the content shared between all wards
    const ward_template = document.createElement('template')
    ward_template.innerHTML = `
        <div class="master">
            <div class="levels">
                <div class="level exitlevel">
                    <p>
                        <a href="#" id="exitWard">Exit Ward</a>
                        <br>
                        <button class="pager selectPatient" id="copyAll">Copy All</button>
                    </p>
                </div>
                <!-- Ward levels will be inserted here -->
            </div>
        </div>
    `
    document.body.appendChild(ward_template.content)

    // Configure the buttons
    const master = document.querySelector('.master')

    master.querySelector('#exitWard').addEventListener('click', () => {
        if (isMiddlesea) {RDAudio.ms.msTransitionIn.play()} else {RDAudio.TransitionIn.play()}
        setTimeout(() => { window.location = `${isMiddlesea ? '':'../'}../../` }, 1200)
    })

    master.querySelector('#copyAll').addEventListener('click', () => {
        navigator.clipboard.writeText(allLinks.join('\n'))
    })

    // Generate each level within the ward
    for (const level of ward_data) {
        const level_template = document.createElement('template')
        // set the character sprite if its found in the list
        if(characters[level.character]){
            level.character = characters[isMiddlesea ? level.character : `../${level.character}`]
        }

        level_template.innerHTML = `
            <div class="level" id=${level.id}>
                <p>
                    ${ level.isBoss ? '<span style="color:#f652a0">Boss</span><br><br>' : '' }
                    <span class="nickname">${level.nickname}</span>
                    <span class="levelname">${level.name}</span>
                    <br>
                    <button class="pager selectPatient" id='copybutton-${level.id}'>Copy Link</button>
                </p>
                <img class="character" src="${isMiddlesea ? level.character : `../${level.character}`}">
            </div>
        `
        master.querySelector('.levels').appendChild(level_template.content)

        // Configure the buttons
        master.querySelector(`#copybutton-${level.id}`).addEventListener('click', () => {
            navigator.clipboard.writeText(level.download)
        })

        allLinks.push(level.download)
    }

    // Apply SFX to all configured elements
    Array.from(master.querySelectorAll('.selectPatient')).map(elem => elem.addEventListener('mouseover', () => {
        if (isMiddlesea) {RDAudio.ms.msSelectPatient.play()} else {RDAudio.SelectPatient.play()}
    }))

    Array.from(master.querySelectorAll('.pager')).map(elem => elem.addEventListener('click', () => {
        if (isMiddlesea) {RDAudio.ms.msPagerButton.play()} else {RDAudio.PagerButton.play()}
    }))
}

/**
 * Loads a ward
 * @param {object} wardObject
 * @param {boolean} isMiddlesea Reserved for official content, breaks community creations.. 
 */
function loadWard(wardObject, isMiddlesea) {
    let bgmSettings = localStorage.getItem('playBgm')
    if (bgmSettings) {
        const bgm = new Audio(`${isMiddlesea ? '' : '../'}../../assets/music/track1.mp3`)
        bgm.volume = 0.25
        bgm.loop = true
        bgm.play() //du dudududu  dudu    dudududu
    }

    if (wardObject.name && wardObject.data) {
        // Update the page title
        document.title = wardObject.name

        // ^ FIXME: Currently all ranks are set to B+, please use this for the demo!
        // & Actually, just ignore it for now. :shushing_face:
        
        // set the background (if it exists)
        if (wardObject.bg){
            if(bgs[wardObject.bg]){
                wardObject.bg = bgs[wardObject.bg]
            }
            document.body.style['background-image'] = "linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('"+wardObject.bg+"')"
        } else {
            console.log("BG not found, using betaward!")
        }

        addWardToScreen(wardObject.data)
    } else {
        alert('Attempted loading a malformed ward. Please check if this ward is correctly formatted.')
    }
}
export default loadWard