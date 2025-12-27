export class Scrollspy{
    constructor(references,contents){
        this.references=references;
        this.contens=contents;
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    menuActive(event){
        const current=event.currentTarget;
        const parent=current.parentElement;

        const active=parent.querySelector('.active');
        if(active){
            active.classList.remove('active');
        }
        current.classList.add("active");
    }

    /** 
     * 
     * @param {IntersectionObserverEntry[]} entries 
     */
    viewContent(target){
        const observer=new IntersectionObserver(e=> this.viewContent(e));
        observer.intection(target)
    }
}