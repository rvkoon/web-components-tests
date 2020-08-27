import {theme} from '../conf/vars.js'
import './header.js'

class Layout extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
            <style>
                #app-wrapper{
                    height: 100vh;
                    overflow: hidden scroll;
                    background-color: ${theme.backgroundColor}
                }
                h1 {
                    color: red
                }
                #char-slot{
                    padding-top: 30px;
                }
            </style>
            <div id="app-wrapper">
                <page-header></page-header>
                <div class="container">
                    <div id="char-slot" class="row"></div>
                </div>
            </div>
        `
    }
}

customElements.define('page-layout', Layout)