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
            flex: 1;
            margin-right: 12px;
            cursor: pointer;
        }
        .todo{
            background-color: #ff9ea1;
        }
        .doing{
            background-color: #ffd09e;
        }
        .done{
            background-color: #cbff9e;
        }
        .delete{
            height: 48px;
            width: 86px;
            padding: 12px;
            background-color: #505050;
            color: #fff;
            border: none;
            border-radius: 10px;
            box-sizing: border-box;
            cursor: pointer;
        }
        .delete:hover{
            background-color: #f72229;
        }
        .delete:focus{
            outline: none;
        }
        .wrapper{
            width: 100%;
            display: flex;
        }
    </style>

    <div class="wrapper">
        <li></li>
        <button class="delete">Supprimer</button>
    </div>
`


class Todo extends HTMLElement {
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
        this._shadowRoot.appendChild(template.content.cloneNode(true))

        this.$todo = this._shadowRoot.querySelector('li')
        this.$deleteBtn = this._shadowRoot.querySelector('.delete')

        this.$deleteBtn.addEventListener('click', e => {
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this._index }))
        })

        this.$todo.addEventListener('click', e => {
            let s = this._status + 1
            if(s > 2) s = 0
            this.dispatchEvent(new CustomEvent('onToggle', { detail: {idx: this._index, status: s }}))
        })
    }

    static get observedAttributes(){
        return ['todo-name', 'status', 'index']
    }

    connectedCallback(){
        this._renderTodo()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'todo-name':
                this._todoName = newValue;
                break
            case 'status':
                this._status = parseInt(newValue);
                break;
            case 'index':
                this._index = parseInt(newValue)
                break
        }
    }

    _renderTodo(){
        this.$todo.className = ''

        if (this._status == 0) this.$todo.classList.add('todo')
        else if (this._status == 1) this.$todo.classList.add('doing')
        else if (this._status == 2) this.$todo.classList.add('done')

        this.$todo.innerHTML = this._todoName
    }

}

customElements.define('todolist-todo', Todo)