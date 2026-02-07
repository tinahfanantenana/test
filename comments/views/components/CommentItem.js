/**
 * @typedef {object} Comments
 * 
 */
export class CommentItem{
    /**
     * 
     */
    #comment;
    #elements;
    #template;
    constructor(comment,element){
        this.#template=element.dataset.template;
        const elements=element.dataset.elements
        this.#elements=JSON.parse(elements);
        this.#comment=comment;
    }


    /**
     * 
     * @param {Function} clone 
     * @returns 
     */
    render(clone){
        const template= clone(this.#template); 
        const body=template.querySelector(this.#elements.body);
        const name=template.querySelector(this.#elements.username);
        body.textContent=this.#comment.body;
        name.textContent=this.#comment.name;
        return template;
    }
}