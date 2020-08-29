import './todo.js'

const template = document.createElement('template')
template.innerHTML = `

    <style>
        input, button{
            height: 30px;
            width: 100px;
            border: none;
            border-radius: 6px;
            box-sizing: border-box;
        }
        button{
            background-color: #505050;
            color: #fff;
            cursor: pointer;
        }
        button:hover{
            background-color: #303030;
        }
        button:focus {
            outline: none;
        }
        input{
            width: 200px;
            background-color: #efefef;
            padding-left: 12px;
        }
        input:focus{
            outline: none;
            box-shadow: inset 0 0 0 1px #505050;
        }
        ul{
            width: 100%;
            padding-left: 0;
        }
    </style>

    <h2>TODO LIST</h2>
    <p class="description">
        - Ajouter des tâches à effectuer<br>
        - Cliquer sur "supprimer" enlève une tâche<br>
        - Cliquer sur une tâche change son statut<br>
        <br>
    </p>
    <div>
        <input type="text" placeholder="Ajouter une tâche"/>
        <button class="add-todo">Ajouter</button>
    </div>

    <ul class="todo-list">
    </ul>
`

class TodoList extends HTMLElement {

    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode : "open"})
        this._shadowRoot.appendChild(template.content.cloneNode(true))

        this.$input    = this._shadowRoot.querySelector('input')
        this.$todoList = this._shadowRoot.querySelector('.todo-list')
        this.$btn      = this._shadowRoot.querySelector('.add-todo')   
        
        this.$btn.addEventListener('click', this._addTodo.bind(this));
    }

    static get observableAttributes(){
        return ['todos']
    }

    connectedCallback(){
        this._fetchTodos()
    }

    async _fetchTodos(){
        const res   = await fetch('http://localhost:5000/todos.json')
        const todos = await res.json()
        this._todos = todos.todos 
        this._renderTodoList()
    }

    _addTodo(e){
        e.preventDefault()
        if(this.$input.value.length > 0){
            this._todos.push({
                "todoName": this.$input.value,
                "status": 0
            })
            this._renderTodoList()
            this.$input.value = ""
        }
    }

    _removeTodo(e) {
        this._todos.splice(e.detail, 1)
        this._renderTodoList()
    }

    _toggleTodo(e){
        this._todos[e.detail.idx].status = e.detail.status
        this._renderTodoList()
    }

    _renderTodoList(){
        this.$todoList.innerHTML = ``

        this._todos.forEach((t, idx) => {
            const $todo = document.createElement('todolist-todo')
            $todo.setAttribute('todo-name', t.todoName)
            $todo.setAttribute('status', t.status)
            $todo.setAttribute('index', idx)
            
            $todo.addEventListener('onRemove', this._removeTodo.bind(this))
            $todo.addEventListener('onToggle', this._toggleTodo.bind(this))

            this.$todoList.appendChild($todo)
        })
    }


    
}

customElements.define('todo-list', TodoList)



