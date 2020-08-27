import {theme} from '../conf/vars.js'

class Header extends HTMLElement {

    constructor(){
        super()
        this.root = this.attachShadow({mode: 'open'})
        this.root.innerHTML = `
            <style>
                #page-header{
                    height: 200px;
                    display: flex;
                    align-items: center;
                    padding: 30px;
                    background-color: ${theme.headerBgColor};
                }
                h1 {
                    color: #fff
                }
            </style>
            <div class="container-fluid" id="page-header">
                <h1>STAR WARS CHARACTERS</h1>
            </div>
        `
    }


}

customElements.define('page-header', Header)