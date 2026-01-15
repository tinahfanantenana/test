import {CommentItem} from '/CommentLists.js';
/**
 * @typedef {object} Comments
 * 
 */
export class CommentLists{
    #comments=[];
    constructor (comments){
        
    }

    addComment(newComment){
        return this.#comments.prepend(newComment);
    }

    getComments(){
        return this.comments;
    }

}