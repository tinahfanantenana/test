export class CommentForm{
    #formElement;
    constructor(formElement){
        this.#formElement=formElement;
    }
    
    /**
     * fonction permettant d'ecouter l'évènement d'ajout d'un nouvel commentaire
     * @param {()=>addComment} addComment 
     */
    onSubmit(addComment){
        this.#formElement.addEventListener('submit', (e)=>{
            e.preventDefault();
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