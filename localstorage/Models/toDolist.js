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
     * @type {toDo}  
     */
    constructor(toDos){
        this.#toDos=toDos;
    }
 

    /**
     * fonction qui ajoute le template de la todo list au DOM
     * @param {HTMLElement} target 
     */
    async appendTo(target){
        const forDom=new ForDom();
        await forDom.loadTemplate('../Views/todo-list-template.html',target);

        target.append(forDom.cloneTemplate('todo-layout-template'));

        this.#listElement =target.querySelector('.list-group');

        if (!this.#listElement) {
            throw new Error('listElement introuvable');
        }


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

        this.#listElement.addEventListener('delete', ({detail : todo})=>{
            this.#toDos=this.#toDos.filter(t=>t.id !== todo.id);
            this.#onUpdate();
        })

        this.#listElement.addEventListener('toggle', ({detail : todo})=>{
            todo.completed=!todo.completed;
            this.#onUpdate();
        })

        
    }

    #onUpdate(){
        return localStorage.setItem('todos',JSON.stringify(this.#toDos))
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
            case 'done':
                    this.#listElement.classList.remove('hide-done');
                    this.#listElement.classList.add('hide-todo');
                    break;
            case 'todo':
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
        this.#toDos.push(todo);
        this.#onUpdate();
        e.currentTarget.reset();
    }
}



class ToDoItem{

    #element;
    todo;
    /**
     * 
     * @type {toDo}
     */ 
    constructor(todo){
        const id=todo.id;
        this.todo=todo;
        const template= document.getElementById('task-template');
        const clone=template.content.cloneNode(true);

        const li=clone.querySelector('li');
        this.#element=li;

        const checkbox=clone.querySelector('input[type="checkbox"]');
        checkbox.id=`todo-${id}`;
        checkbox.checked= todo.completed //? true : false;
        const label=clone.querySelector('label');
        label.setAttribute('for',`todo-${id}`);
        label.textContent=todo.title;

        const deleteBtn=clone.querySelector('button');
        // const item=new ForDom();
        // const li=item.createElement('li',{'class': "todo list-group-item d-flex align-items-center"});
        // this.#element=li;
        // const checkbox=item.createElement('input',{type:"checkbox", class:"form-check-input me-2",id:`todo-${id}`, checked : todo.completed ? '' : null});
        // const label=item.createElement('label',{'class':"form-check-label ms-2",for:`todo-${id}`});
        // label.textContent=todo.title; 
        // const deleteBtn=item.createElement('button',{'class':"ms-auto btn btn-danger btn-sm"});
        // deleteBtn.innerHTML='delete';
        // li.append(checkbox, label);
        // li.appendChild(deleteBtn);
        this.toggle(checkbox);
        li.addEventListener('click',(e)=>{
            if(e.target.tagName==='BUTTON'){
                this.remove(e);
            }});

        checkbox.addEventListener('change',e=>this.toggle(e.currentTarget))
        
        try {
            this.#element.addEventListener('delete', e=>{ console.log(e.detail.title)});
        } catch (error) {
            console.log(error);
        }
    }

    
    /**
     * 
     * @param {PointerEvent} e 
     */
    remove(e){
        e.preventDefault();
        const event= new CustomEvent('delete',{detail:this.todo, bubbles:true});
        this.#element.dispatchEvent(event);
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
        const event= new CustomEvent('toggle',{detail:this.todo,bubbles:true});
        this.#element.dispatchEvent(event);
    }

    /**
     * @return {HTMLElement} 
     */
    get element(){
        return this.#element;
    }
}
