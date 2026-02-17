import { Comment } from "../models/Comment.js";
import { CommentLists } from "../views/components/CommentsLists.js";
import {InfinitePagination} from '../cores/InfinitePagination.js';
import { ApiService } from "../services/ApiService.js";
import { showError } from "../views/components/alert.js";
import { ForDom } from "../views/ForDom.js";
import { CommentForm } from "../views/components/CommentForm.js";

    /*instancation de la class forDom */
const forDom =new ForDom();
const clone = (id)=>forDom.cloneTemplate(id);

    /*----ELEMENTS------*/ 
const element= document.querySelector('.js-infinite-pagination');
const formElement= document.querySelector('.js-form-fetch');


if (!formElement || !element) {
    throw new Error("Éléments DOM requis introuvables");
}

    /*----LISTES DES COMMENTAIRES-----------*/
const comments=[];
const listeComm=new CommentLists(element, clone);

/*-----------VALEUR INITIAL------*/
async function initialPagination(){
    try {
        const newurl=new URL(element.dataset.endpoint);
        newurl.searchParams.set('_page',1);
        const url=newurl.toString();
        const apiService=new ApiService(url,{});
        const data=await apiService.request();

        if (!data || data==0)return;

        const newComment= data.map(item=> new Comment({
            id:item.id,
            name:item.name,
            body:item.body
        }));

        comments.push(...newComment);
        return listeComm.renderlist(comments);

    } catch (error) {
        console.log(error);
        const errorInit= showError("erreur d'initialisation");
        element.after(errorInit);
    }
} 
    /*-----EVENEMENT POUR L'AJOUT D'UN NOUVEAU COMMENTAIRE--------*/
const commentForm= new CommentForm(formElement);
commentForm.onSubmit((data)=>{
    const comment= new Comment(data);

    // mise à jour du state central
    comments.unshift(comment);

    listeComm.prependComment(comment);
});

    /*-----------AFFICHAGE DE L'ERREUR-----------*/
const afficheErreur= (message) => showError (message);


/*----GENERER LE CONTENUE ET LA PAGINATION INFINIE---------*/
const infinitePagination= new InfinitePagination({
    element: element,
    onError: afficheErreur,
    onLoad:  async (url)=>{
        const apiService= new ApiService(url,{});
        const data= await apiService.request();
        const newComment= data.map((item)=>new Comment({id:item.id,name:item.name,body:item.body}));
        comments.push(...newComment);
        newComment.forEach(comment => {
            listeComm.appendComment(comment);
        });
        return newComment;
    }
});

(async function init(){
    await initialPagination();
})()