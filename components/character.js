class Character extends HTMLElement {

    constructor(){
        super()
    }

    style = `
        <style>
            .char-card{
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding: 12px;
                border-radius: 8px;
                box-shadow: 4px 2px 8px rgba(0,0,0,0.05);
                margin: 5px;
            }
        </style>
    `

    set char(char){
        this.innerHTML = `
            ${this.style}
            <div class="char-card">
                <h4>${char.name}</h4>
                <p>
                    height: <b>${char.height}</b><br/>
                    mass: <b>${char.mass}</b><br/>
                </p>
            </div>
        `
    }
}

customElements.define('sw-char', Character);