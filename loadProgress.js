function loadProgress(Ward) {
    if (!Ward.name && !Ward.data) return alert(`Attempted loading a malformed ward. Please check if this ward is correctly formatted.`)
    let ranks = localStorage.getItem('ranks')
    if (ranks) {
        Ward.data.forEach((level) => {
            if (level.type!=="exit") {
                const levelDiv = document.getElementById(level.id)
                console.log('H')
                if (levelDiv) {
                    levelDiv.firstChild.firstChild.remove()
                    levelDiv.firstChild.lastChild.remove()
                }
            }
        })
    } else {
        localStorage.setItem('ranks', [{rank: 'b+', id: 'undefined'}])
    }
}

// [ {rank: "b+", id: "levelid"} ]

export default loadProgress