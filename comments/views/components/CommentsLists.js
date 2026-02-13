    /**
    * @callback CloneTemplate
    * @param {string} id
    * @returns {HTMLElement}
    */
import {CommentItem} from './CommentItem.js';
/**
 * @typedef {Object} CommentData
 * 
 */
export class CommentLists{
    /**
     * @type {HTMLElement}
     */
    #target;

    /**
    * @type {HTMLElement} - contenant les dataset 
    */
    #element;

    
    /** @type {CloneTemplate} */
    #clone;

    constructor (element, clone){
        this.#element=element;
        this.#target=document.querySelector(element.dataset.target);
        if(!this.#target){
            throw new Error('element introuvable');
        }
        this.#clone=clone;
    }

    /**
     * fonction qui ajoute un commentaire dans la liste
     * @param {object} comments 
     * @returns {void}
     */
    renderlist(comments){
        for (let comment of comments){
            let newComment=new CommentItem(comment,this.#element);
            this.#target.append(newComment.render(this.#clone));
        }
    }

     /**
     * fonction qui ajoute un commentaire en dessous la liste
     * @param {object} newComment
     * @returns {void}
     */
    appendComment(newComment){
        let comment=new CommentItem(newComment,this.#element);
        return this.#target.append(comment.render(this.#clone));
    }


    /**
     * fonction pour ajouter un commentaire en dessus de la liste
     * @param {CommentData} newComment 
     * @returns {void}
     */
    prependComment(newComment){
        let comment=new CommentItem(newComment,this.#element);
        return this.#target.prepend(comment.render(this.#clone));
    }


}