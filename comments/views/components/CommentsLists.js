import {CommentItem} from '/CommentItem.js';
/**
 * @typedef {object} Comments
 * 
 */
export class CommentLists{
    #lists=[];
    #target;
    #element;
    constructor (comments, element){
        this.#comments=comments;
        this.#element=element;
        this.#target=element.dataset.target;
    }

    renderlist(clone){
        if(!this.#target){
            throw new Error('element introuvable');
        }
        for (let comment of this.#comments){
            let newComment=new CommentItem(comment,this.#element);
            this.#target.append(newComment.render(clone));
        }
        return this.#target.append(this.#lists);
    }

    addComment(newComment){
        return this.#target.prepend(newComment);
    }
}