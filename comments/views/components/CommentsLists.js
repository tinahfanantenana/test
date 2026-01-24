import {CommentItem} from '/CommentItem.js';
/**
 * @typedef {object} Comments
 * 
 */
export class CommentLists{
    #comments=[];
    #lists=[];
    #target;
    #template;
    #element;
    constructor (comments, element){
        this.#comments=comments;
        this.#element=element;
        this.#target=element.dataset.target;
        this.#template=element.dataset.template;
    }

    renderlist(){
        for (let comment of this.#comments){
            let newcomment=new CommentItem();
        }
        return this.#lists;
    }
    addComment(newComment){
        return this.#comments.unshift(newComment);  
    }

    getComments(){
        return this.comments;
    }

}