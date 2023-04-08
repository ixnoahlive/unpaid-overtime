import RDAudio from './audio.js'

function addWardToScreen(ward_data) {
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
        RDAudio.TransitionIn.play()
        setTimeout(() => { window.location = "../../" }, 1200)
    })

    master.querySelector('#copyAll').addEventListener('click', () => {
        navigator.clipboard.writeText(allLinks.join('\n'))
    })

    // Generate each level within the ward
    for (const level of ward_data) {
        const level_template = document.createElement('template')

        level_template.innerHTML = `
            <div class="level" id=${level.id}>
                <p>
                    ${ level.isBoss ? '<span style="color:#f652a0">Boss</span><br><br>' : '' }
                    <span class="nickname">${level.nickname}</span>
                    <span class="levelname">${level.name}</span>
                    <br>
                    <button class="pager selectPatient" id='copybutton-${level.id}'>
                        <span>Copy Link</span>
                    </button>
                </p>
                <img class="character" src="${level.character}">
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
        RDAudio.SelectPatient.play()
    }))

    Array.from(master.querySelectorAll('.pager')).map(elem => elem.addEventListener('click', () => {
        RDAudio.PagerButton.play()
    }))
}

function loadWard(wardObject) {
    let bgmSettings = localStorage.getItem('playBgm')
    if (bgmSettings) {
        const bgm = new Audio('../../assets/music/track1.mp3')
        bgm.volume = 0.25
        bgm.loop = true
        bgm.play() //du dudududu  dudu    dudududu
    }

    if (wardObject.name && wardObject.data) {
        // Update the page title
        document.title = wardObject.name

        // ^ FIXME: Currently all ranks are set to B+, please use this for the demo!
        // & Actually, just ignore it for now. :shushing_face:

        addWardToScreen(wardObject.data)
    } else {
        alert('Attempted loading a malformed ward. Please check if this ward is correctly formatted.')
    }
}
export default loadWard