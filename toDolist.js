
/**
 * @property {HtmlElement} elementsParent
 */
export class ToDoList {
    constructor(elementsParent){
        this.elementsParent = elementsParent;
        this._toDo();
    }

    async _toDo(){
        try {
            const toDoList= await fetch("https://jsonplaceholder.typicode.com/todos/?_limit=5",{
                headers:{accept: 'application/json'}
            })

            if(!toDoList.ok){
                throw new Error('Erreur serveur');
            }

            const tasks=await toDoList.json();

            for (let task of tasks){
                this.elementsParent.append(this.createTask(task.id,task.title));
            }
        } catch (error) {
            console.log(error) 
        } 
        

    }

    /**
     * fonction pour créer une tache
     * @param {number} id 
     * @param {string} task 
     * @returns {HtmlElement}
     */
    createTask(id, task){
        const toDo= document.createElement('li');
        toDo.setAttribute('class','list-group-item d-flex justify-content-between align-items-center');

        const divToDo=document.createElement('div');

        const toDochecker= document.createElement('input');
        this.setAttributes(toDochecker,{value:id,class:"task-check",type:"checkbox", id:'idInput'});

        const toDoContent=document.createElement('label');
        toDoContent.setAttribute("class", "form-check-label ps-1");
        toDoContent.innerHTML=task

        const toDoDelete=document.createElement('button');
        this.setAttributes(toDoDelete,{class:'btn btn-danger btn-sm',type:'button', id: "delete-btn"});
        toDoDelete.innerText = "Supprimer";

        divToDo.append(toDochecker,toDoContent);
        toDo.append(divToDo,toDoDelete);
        
        return toDo;
    }


    /**
     * fonction pour attribuer plusieur attribut à un élément
     * @param {String} element 
     * @param {{key:value}} attrs 
     * @returns {void}
     */
    setAttributes(element, attrs){
        for (let key in attrs){
            element.setAttribute(key, attrs[key])
        }
    }



    /**
     * fonction pour ajouter une tache
     * @param {string} task 
     * @returns {void}
     */
    addTask(task) {
        try {
            let id=1;
            const liList=this.elementsParent.querySelectorAll('li').length;
            if (liList>0){
                id= parseInt(this.elementsParent.lastElementChild.querySelector('input').value)+1;
            }
            let toDo=this.createTask(id,task);
            this.elementsParent.append(toDo);

        } catch (error) {
            const e=document.createElement('h6');
            e.setAttribute('class','danger danger');
            e.innerHTML=error.message;
            e.style.color='red';
            this.elementsParent.append(e)
        }
    }


    /**
     * 
     * @param {HtmlElement} task
     * @returns {void}
     */
    deleteTask(task) {
        task.remove();
    }


    markTaskAsDone(taskId) {
        const task=this.elementsParent.querySelector(`input[value='${taskId}']`);
        if (task){
            task.toggleAttribute('checked');
        }       
    }


    displayTasks(tasks) {
        this.elementsParent.innerHTML = "";

        tasks.forEach(task => {
            this.elementsParent.appendChild(task);
        });
    }


    sawTasks(elements){
        const tasks=[];
        
        elements.forEach(element => {
            if (element.tagName==='LI'){
                tasks.push(this.elementsParent.innerHTML=element);
            } else if (element.tagName==='INPUT'){
                let listItem= element.parentElement.parentElement;
                tasks.push(this.elementsParent.innerHTML=listItem);
            }
        });
        return tasks;
    }
    
    getTasks(filter) {
        switch(filter){
            case 'all':
                return this.sawTasks(this.elementsParent.querySelectorAll('li'));
            case 'done':
                return this.sawTasks(this.elementsParent.querySelectorAll('input:checked'));
            case 'toDo':
                return this.sawTasks(this.elementsParent.querySelectorAll('input:not(:checked)'));
            default:
                throw new Error('Unknown filter');
        }
    }
}