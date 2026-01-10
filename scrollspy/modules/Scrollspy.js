/**
 * objet pour gérer le scrollspy en affichage
 */
export class ScrollSpy{
    contentSelector;
    linkSelector;
    #ratio=0.6;
    constructor(contentSelector,linkSelector){
        this.linkSelector=linkSelector;
        this.contentSelector=contentSelector;
    }

    /**
     * fonction qui sert à activé un menu selon l'affichage
     */
    activeMenu(){
        let y=Math.round(window.innerHeight*this.#ratio)
        const spies=this.contentSelector.querySelectorAll('[data-content]')
        if(spies.length>0){
            const observer= new IntersectionObserver(
                (entries)=>this.#callback(entries)
                ,
                {rootMargin: `-${window.innerHeight-y-1}px 0px -${y}px 0px`}
            )
            spies.forEach( spy => {
                observer.observe(spy)
            }); 
        }
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    #activeLink(element){
        const id=element.getAttribute('id');
        const link=this.linkSelector.querySelector(`a[href="#${id}"]`);
        if (link === null){
            return null
        }
        link.parentElement.querySelectorAll('.active').forEach(node=>node.classList.remove('active'));
        link.classList.add('active');
    }

    /**
     * 
     * @param {IntersectionObserverEntry[]} entries 
     */
    #callback(entries){
        entries.forEach(entrie => {
            if(entrie.intersectionRatio>0){;
                this.#activeLink(entrie.target);
            }
        });
    }
}