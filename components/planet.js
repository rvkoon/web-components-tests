const template = document.createElement('template')
template.innerHTML = `

    <style>
        li{
            list-style-type: none;
            padding: 12px;
            background-color: #efefef;
            margin-bottom: 10px;
            border-radius: 10px;

            display: flex;
            align-items: center;
            justify-content: space-between;

        }
        h3, p{
            margin: 0;
        }
    </style>

    <li>
        <h3>Name:&nbsp;<span class="planet-name"></span></h3>
        <div>
            <p>Population:&nbsp;<b><span class="planet-population"></span></b><p>
        </div>
    </li>
`

class Planet extends HTMLElement {

    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode : 'open'})
        this._shadowRoot.appendChild(template.content.cloneNode(true))

        this.$planetRoot = this._shadowRoot.querySelector('li')
        this.$planetName = this._shadowRoot.querySelector('.planet-name')
        this.$planetPopulation = this._shadowRoot.querySelector('.planet-population')

    }

    static get observedAttributes() {
        return ['planetname', 'planetpopulation']
    }

    connectedCallback(){
        this._renderPlanet()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'planetname':
                this._planetname = newValue;
                break;
            case 'planetpopulation':
                this._planetpopulation = newValue;
                break;
        }
    }

    _renderPlanet(){
        this.$planetName.innerHTML = this._planetname
        this.$planetPopulation.innerHTML = this._planetpopulation
    }

}

customElements.define('sw-single-planet', Planet)