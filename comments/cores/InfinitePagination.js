import { ApiService } from "../services/ApiService";
export class InfinitePagination{
    #onLoad;
    #onError;
    #loading;
    #element;
    #observer;
    constructor({element, onLoad, onError}){
        this.#element=element;
        this.#onLoad=onLoad;
        this.#onError=onError;
        this.#observer=new IntersectionObserver((entries)=>{
            entries.forEach(entrie => {
                if(entrie.isIntersecting){
                    this.#loadMore();
                }
            });
        })
        this.#observer.observe(this.#element);
    }

    async #loadMore(){
        if (this.#loading){
            return
        }
        
        try {
            this.#loading=true;
            this.#onLoad();
            this.#loading=false;
        } catch (error) {
            this.#onError();
        }
    }
}