import { ForDom } from "../Views/forDom.js";


/**
 * @typedef {Object} toDo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class ToDolist{
    #toDos=[]

    /**
     * @type {HTMLUListElement}
     */
    #listElement=[];
    /**
     * 
     * @param {[]} toDos 
     */
    constructor(toDos){
        this.#toDos=toDos;
    }


    /**
     * fonction qui ajoute le template de la todo list au DOM
     * @param {HTMLElement} target 
     */
    appendTo(target){
        target.innerHTML=`<h3>todolist</h3>
        <form class="d-flex pb-4">
            <input type="text" class="form-control me-2" id="taskInput" placeholder="Enter a new task" name="title">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-primary active" data-filter="all" >All</button>
                <button type="button" class="btn btn-outline-primary" data-filter="todo">Active</button>
                <button type="button" class="btn btn-outline-primary" data-filter="done">Completed</button>
            </div>
            <ul class="list-group">
                
            </ul>
        </main>`;

        this.#listElement =target.querySelector('.list-group');
        this.#toDos.forEach(todo=>{ 
            const item=new ToDoItem(todo);
            this.#listElement.append(item.element);
        });
        const form=target.querySelector('form');
        form.addEventListener('submit',(e)=>this.onSubmit(e));
        const buttons=target.querySelectorAll('.btn-group button');
        buttons.forEach(button=>{
            button.addEventListener('click',(e)=>this.#toggleFilter(e));
        });
        
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #toggleFilter(e){
        e.preventDefault();
        const filter=e.currentTarget.getAttribute('data-filter');
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active');
        e.currentTarget.classList.add('active');
        switch(filter){
            case 'all':
                    this.#listElement.classList.remove('hide-done');
                    this.#listElement.classList.remove('hide-todo');
                break;
            case 'todo':
                    this.#listElement.classList.remove('hide-done');
                    this.#listElement.classList.add('hide-todo');
                    break;
            case 'done':
                    this.#listElement.classList.add('hide-done');
                    this.#listElement.classList.remove('hide-todo');
                break;
        }   
    }

    /**
     * 
     * @param {SubmitEvent} e 
     * @returns 
     */
    onSubmit(e){
        e.preventDefault();
        //récupérer le thème qui a été rentré. title est la valeur de l'attribut name
        const title= new FormData(e.currentTarget).get('title').toString()
        if(title.trim()===''){
            return;
        }
        //créer un objet toDo
        const todo={
            id: `toto-${Date.now()}`,
            title: title,
            completed: false
        };
        const item=new ToDoItem(todo);
        this.#listElement.prepend(item.element);
        e.currentTarget.reset();
    }

   
    /**
     * 
     * @returns {toDo[]}
     */
}



class ToDoItem{

    #element;

    /**
     * 
     * @type {toDo}
     */
    constructor(todo){
        const id=todo.id;
        const toDo= document.createElement('li');
        toDo.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');

        const item=new ForDom();
        const li=item.createElement('li',{'class': "todo list-group-item d-flex align-items-center"});
        this.#element=li;
        const checkbox=item.createElement('input',{'type':"checkbox", 'class':"form-check-input me-2",id:`todo-${id}`, 'checked': todo.completed ? "" : null});
        const label=item.createElement('label',{'class':"form-check-label ms-2",for:`todo-${id}`});
        label.textContent=todo.title;
        const deleteBtn=item.createElement('button',{'class':"ms-auto btn btn-danger btn-sm"});
        deleteBtn.innerHTML='delete';
        li.append(checkbox, label);
        li.appendChild(deleteBtn);
        this.toggle(checkbox);
        li.addEventListener('click',(e)=>{
            if(e.target.tagName==='BUTTON'){
                li.remove();
            }});

        checkbox.addEventListener('change',e=>this.toggle(e.currentTarget))

        
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    remove(e){
        e.preventDefault();
        this.#element.remove();
    }

    /**
     * change l'état de la tâche en fonction de l'état de la checkbox
     * @param {HTMLInputElement} target 
     */
    toggle(target){
        if(target.checked){
            this.#element.classList.add('is-completed');
        } else {
            this.#element.classList.remove('is-completed');
        }
    }

    /**
     * 
     * @return {HTMLElement} 
     */
    get element(){
        return this.#element;
    }
}
