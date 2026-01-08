export class ScrollSpy{
    contentSelector;
    linkSelector;
    #ratio=0.6;
    constructor(contentSelector,linkSelector){
        this.linkSelector=linkSelector;
        this.contentSelector=contentSelector;
    }

    activeMenu(){
        let y=math.round(window.innerHeight*this.#ratio)
        const observer= new IntersectionObserver(
            (entries)=>{
                entries.forEach(entrie => {
                    if(entrie.intersectionRatio>0){
                        const id=entrie.target.getAttribute('id');
                        this.#activeLink(id);
                    }
                });

                if(length.this.contentSelector>1){
                    observer.observe(this.contentSelector)
                }
            }
            ,
            {rootMargin: `${window.innerHeight-y-1}px 0px -${y}px 0px`}
        )
    }

    #activeLink(){

    }
}