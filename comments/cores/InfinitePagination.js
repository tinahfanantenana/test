export class InfinitePagination{
    #onLoad;
    #onError;
    #loading;
    #element;
    #observer;
    #endpoint;
    #page=1;
    constructor({element, onLoad, onError}){
        this.#element=element;
        this.#onLoad=onLoad;
        this.#endpoint=element.dataset.endpoint;
        this.#onError=onError;
        this.#observer=new IntersectionObserver(this.#handleObserver())
        this.#observer.observe(this.#element);
    }

    #handleObserver=(entries)=>{
        entries.forEach(entrie => {
            if(entrie.isIntersecting){
                this.#loadMore();
            }
        });
    };


    async #loadMore(){
        if (this.#loading){
            return
        }
        
        try {
            this.#loading=true;
            const url= this.#buildURL();
            const items=await this.#onLoad(url);
            if (!items||items.length==0){
                this.#element.style.display='none';
                this.#observer.disconnect();
                return;
            }
            this.#page++
        } catch (error) {
            this.#element.style.display='none';
            const e = this.#onError('impossible de charger les contenus');
            e.addEventListener('close', (e)=>{
                this.element.style.removeProperty('display');

            } )
            this.#element.append(e);
        }finally{
            this.#loading=false;
        }
    }

    #buildURL(){
        const url= new URL(this.#endpoint);
        url.searchParams.set('_page',this.#page);
        return url.toString();
    }


}