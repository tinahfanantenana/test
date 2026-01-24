import {Comment} from '../../models/Comment.js';

/**
 * @typedef {object} Comments
 * 
 */
export class CommentItem{
    #elements;
    #template;
    constructor(comment,element){
        this.#template=element.dataset.template;
        const elements=element.dataset.elements
        this.#elements=JSON.parse(elements);
        this.#comment=comment;
    }



    render(clone){
        const template= clone(this.#template); 
        const body=template.querySelector(this.#elements.body);
        const name=template.querySeectore(this.#elements.username);
        body.texteContent=this.#comment.body;
        name.texteContent=this.#comment.name;
        return template;
    }
}