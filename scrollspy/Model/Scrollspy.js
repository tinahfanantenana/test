export class Scrollspy{
    /**
     *fonction pour activer et desactivé un menu cliqué 
     * @param {PointerEvent} e 
     */
    menuActive(event){
        const current=event.currentTarget;
        this.activeMenu(current);
    }

    /** 
     * fonction pour afficher un contenue
     * @param {elementHTML} target 
     */
    viewContent(target){
        const observer=new IntersectionObserver((entries)=>{
            for(let entry of entries){
                entry.isIntersecting=true;
            }
        });
        observer.observe(target)
    }

    /**
     *fonction pout assigner l'attribut active au menu 
     * @param {HTMLElement} target 
     */
    activeMenu(target){
        const parent=target.parentElement;

        const active=parent.querySelector('.active');
        if(active){
            active.classList.remove('active');
        }
        target.classList.add("active");
    }

}