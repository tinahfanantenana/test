    /**
    * @callback CloneTemplate
    * @param {string} id
    * @returns {HTMLElement}
    */
import {CommentItem} from '/CommentItem.js';
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

    /**
    * @type {comments[]} -listes des commentaires manipulés par la classe
    */
    #comments;

    
    /** @type {CloneTemplate} */
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
     * fonction qui ajoute un commentaire dans la liste
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
     * fonction pour ajouter un commentaire à la liste
     * @param {CommentData} newComment 
     * @returns {void}
     */
    addComment(newComment){
        let comment=new CommentItem(newComment,this.#element);
        return this.#target.prepend(comment.render(this.#clone));
    }
}