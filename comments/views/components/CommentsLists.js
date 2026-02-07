import {CommentItem} from '/CommentItem.js';
/**
 * @typedef {Object} CommentData
 * 
 */
export class CommentLists{
    #target;
    #element;
    #comments;
    #clone;
    constructor (comments, element, clone){
        this.#comments=comments;
        this.#element=element;
        this.#target=document.querySelector(element.dataset.target);
        if(!this.#target){
            throw new Error('element introuvable');
        }
        this.#clone=clone;
    }

    /**
     * 
     * @param {()=>cloneTemplate} clone 
     * @returns {void}
     */
    renderlist(){
        for (let comment of this.#comments){
            let newComment=new CommentItem(comment,this.#element);
            this.#target.append(newComment.render(this.#clone));
        }
    }

    /**
     * 
     * @param {CommentData} newComment 
     * @returns {void}
     */
    addComment(newComment){
        let comment=new CommentItem(newComment,this.#element);
        return this.#target.prepend(comment.render(this.#clone));
    }
}