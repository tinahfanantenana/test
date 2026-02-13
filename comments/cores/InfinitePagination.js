/**
 * @callback InfinitePaginationOnLoad
 * @param {string} url URL construite avec les paramètre de pagination
 * @returns {Promise<Array<any>>} listes des éléments chargés
 */

/**
 * @callback InfinitePaginationOnError
 * @param {string} message Message d'erreur à afficher
 * @returns {HTMLElement} Element d'erreur à inséré dans le DOM
 */

export class InfinitePagination{
    /** @type {InfinitePaginationOnLoad} */
    #onLoad;

    /** @type {InfinitePaginationOnError} */
    #onError;

    /** @type {boolean} */
    #loading=false;

    /** @type {HTMLElement} */
    #element;

    /** @type {IntersectionObserver} */
    #observer;

    /** @type {string} */
    #endpoint;

    /** @type {number} */
    #page=2;

    /**
     * 
     * @param {Object} option
     * @param {HTMLElement} option.element Element chargé pour déclencher le chargement
     * @param {InfinitePaginationOnLoad} option.onLoad fonction de chargement 
     * @param {InfinitePaginationOnError} option.onError fonction de gestion des erreurs 
     */
    constructor({element, onLoad, onError}){
        this.#element=element;
        this.#onLoad=onLoad;
        this.#endpoint=element.dataset.endpoint;
        this.#onError=onError;
        this.#observer=new IntersectionObserver(this.#handleObserver)
        this.#observer.observe(this.#element);
    }

    /**
     * 
     * @param {IntersectionObserverEntry[]} entries 
     * @private
     */
    #handleObserver=(entries)=>{
        entries.forEach(entrie => {
            if(entrie.isIntersecting){
                this.#loadMore();
            }
        });
    };

    /**
     * charge la page suivant de contenu
     * @returns {Promise<void>}
     * @private
     */
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
                this.#element.style.removeProperty('display');
            } )
            this.#element.append(e);
        }finally{
            this.#loading=false;
        }
    }

    /**
     * construit l'URL de requête avec le paramètre de pagination
     * @returns {string} url finale
     */
    #buildURL(){
        const url= new URL(this.#endpoint);
        url.searchParams.set('_page',this.#page);
        return url.toString();
    }
}