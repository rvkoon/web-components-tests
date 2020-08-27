import './components/layout.js'
import './components/character.js'


window.addEventListener('load', () => {
    const layout = document.createElement('page-layout')
    root.appendChild(layout)
    fetchCharacters()
})

const root = document.getElementById('root')

const fetchCharacters = () => {
    const charSlot = document.getElementById('char-slot')
    charSlot.innerHTML = 'Loading...'
    setTimeout(async () => {
        const res = await fetch('https://swapi.dev/api/people/')
        const data = await res.json()
        charSlot.innerHTML = null
        data.results.map(el => {
            const char = document.createElement('sw-char')
            char.char = el
            char.classList.add('col-md-4')
            charSlot.appendChild(char)
        })
    }, 2000)
}
