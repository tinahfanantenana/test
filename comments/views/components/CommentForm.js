export class CommentForm{
    #formElement;
    #dataForm;
    constructor(formElement, dataForm){
        this.#formElement=formElement;
        this.#dataForm=dataForm;
    }
    
    /**
     * fonction permettant d'ecouter l'évènement d'ajout d'un nouvel commentaire
     * @param {function} addComment 
     */
    onSubmit(addComment){
        this.#formElement.addEventListener('submit', ()=>{
            const data= new FormData(this.#formElement);
            let comment={};
            for (let [key, value] of data.entries()){
                comment[key]=value;
            }
            addComment(comment);
            this.#formElement.reset();
        })
    }
}