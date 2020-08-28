import "./planet.js"

const template = document.createElement('template')
template.innerHTML = `

    <style>
        @import url('/style.css');
        .visible{
            display: block;
        }
        .hidden{
            display: none;
        }
        h2{
            margin-bottom: 30px;
        }
    </style>

    
    <h2>Star Wars planets</h2>
    <h4 class="loader">Loading...</h4>
    <ul class="planet-list list-group"></ul>
    
`

class Planets extends HTMLElement {

    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$planetList = this._shadowRoot.querySelector('.planet-list')
        this.$loader = this._shadowRoot.querySelector('.loader')
    }

    connectedCallback(){
        this._loader = true
        setTimeout(() => this._fetchPlanets(), 2000)
    }

    async _fetchPlanets(){
        const res = await fetch('https://swapi.dev/api/planets/')
        const planets = await res.json()
        this._planets = planets.results
        this._loader = false
        this._renderPlanetList()

    }

    _renderPlanetList() {

        if(!this._loader) this.$loader.classList.add('hidden')
        else this.$loader.classList.remove('hidden')

        if(this._planets.length){
            this.$planetList.innerHTML = ''
            this._planets.forEach(p => {
                const $planet = document.createElement('sw-single-planet')
                $planet.setAttribute('planetname', p.name)
                $planet.setAttribute('planetpopulation', p.population)
    
                this.$planetList.appendChild($planet)
            })
        }

    }

}

customElements.define('sw-planets', Planets)