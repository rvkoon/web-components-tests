import {theme} from '../conf/vars.js'

class Header extends HTMLElement {

    connectedCallback(){
        this.innerHTML = `


            <style>
                #page-header{
                    box-sizing: border-box;
                    height: 100px;
                    background: linear-gradient(to left, ${theme.headerBgColor}, #bb4687);
                }
                .fullH{
                    height: 100%;
                }
                .headerBox{
                    display: flex;
                    align-items: center;
                }
                .headerNav{
                    justify-content: flex-end;
                }
                h1, a{
                    margin: 0;
                    color: #fff;
                }
                h1 {
                    transform: translateY(-4px);
                }
                a{
                    text-decoration: none;
                    margin: 5px;
                }
                .link:hover{
                    color: #fff;
                    transform: scale(1.1);
                }

            </style>


            <div class="container-fluid" id="page-header">
                <div class="row fullH">
                    <div class="col-6 headerBox fullH">
                        <a href="/index.html"><h1>Web Components Tests</h1></a>
                    </div>
                    <div class="col-6 headerBox headerNav fullH">
                        <a href="/pages/todolist.html" class="link">todolist</a>
                        <a href="/pages/planets.html" class="link">planets</a>
                    </div>
                </div>
            </div>
        `
    }


}

customElements.define('page-header', Header)