function loadWard(wardObject) {
    if (localStorage.getItem('playBgm')!==false) {
        const bgm = new Audio('assets/music/track1.mp3')
        bgm.volume = 0.25
        bgm.loop = true
        bgm.play()
    }
}

export default loadWard