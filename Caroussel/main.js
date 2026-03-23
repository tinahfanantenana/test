
/**
 * Pour ajouter la navigation tactile pour la caroussel
 */
class CarousselTouchPlugin{
    /**
     * 
     * @param {Carousel} carousel 
     */
    constructor(carousel){
        carousel.carouselContainer.addEventListener('dragstart', e=>e.preventDefault())
        carousel.carouselContainer.addEventListener('mousedown',this.startDrag.bind(this));
        carousel.carouselContainer.addEventListener('touchstart',this.startDrag.bind(this));
        window.addEventListener('mousemove',this.drag.bind(this));
        window.addEventListener('touchmove',this.drag.bind(this));
        window.addEventListener('touchend',this.endDrag.bind(this));
        window.addEventListener('mouseup',this.endDrag.bind(this));
        window.addEventListener('touchcancel',this.endDrag.bind(this));
        
        this.carousel=carousel;
    }

    /**
     * Démarre le déplacement au touché ou au maintient du souris
     * @param {MouseEvent|TouchEvent} e 
     */
    startDrag(e){
        if(e.touches){
            if(e.touches.length>1){
                return
            }else{
                e=e.touches[0];
            }
        }
        this.origin={x:e.screenX,y:e.screenY};
        this.width=this.carousel.containerWidth;
        this.carousel.desableTransition();
    }

    /**
     * Deplacement
     * @param {MouseEvent|TouchEvent} e 
     */
    drag(e){
        if(this.origin){
            let point=e.touches ? e.touches[0]: e;
            let translate={x: point.screenX-this.origin.x,y:point.screenY-this.origin.y};
            if(e.touches&&Math.abs(translate.x)>Math.abs(translate.y)){
                e.preventDefault();
                e.stopPropagation();
            }
            let baseTranslate=this.carousel.currentItem*-100/this.carousel.items.length;
            this.lastTranslate=translate; 
            this.carousel.translate(baseTranslate+100*translate.x/this.width)
        }
    }
    /**
     * fin du déplacement
     * @param {MouseEvent|TouchEvent} e 
     */
    endDrag(e){
        if(this.origin&&this.lastTranslate){
            this.carousel.enableTransition();
            if (Math.abs(this.lastTranslate.x / this.carousel.carouselWidth)>0.2){
                if(this.lastTranslate.x<0){
                    this.carousel.next()
                }else{
                    this.carousel.prev()
                }
            }else{
                this.carousel.goTo(this.carousel.currentItem);
            }
        }
        this.origin=null;
    }
}



class Carousel{
    element;
    #options;
    carouselContainer;
    items;
    #root;
    #onResize;
    currentItem;
    #callBackForSlide;
    offset;

    /**
     * @callback onSlide
     * @param {number} index
     */

    /**
     * @param {HTMLElement} element 
     * @param {object} option
     * @param {number} [option.slideToScroll=1]
     * @param {number} [option.slideVisible=1]
     * @param {boolean} [option.loop=false] 
     * @param {boolean} [option.pagination=false]
     * @param {boolean} [option.infinite=false]
     */
    constructor(element, options={}){
        if (!element) {
            throw new Error("Carousel: element not found");
        }
        

        this.element=element;
        this.isMobile=false;
        this.#options={slideToScroll:1,slideVisible:1,loop:false,pagination:false,infinite:false, ...options};
        this.currentItem=0;
        this.#callBackForSlide=[];
        const childs=[...element.children];
        this.offset=0;
        if(this.#options.infinite&&this.#options.loop){
           throw new Error("la caroussel ne peut être à la fois infinie et en boucle")
        }

        this.#root= this.#createDivWithClass('carousel');
        this.carouselContainer= this.#createDivWithClass('carousel__container');
        this.#root.appendChild(this.carouselContainer);
        this.#root.setAttribute('tabindex','0');
        element.appendChild(this.#root);
        this.items=childs.map( (child) => {
            const item=this.#createDivWithClass('carousel__item');
            item.append(child);
            return item
        });


        
        this.#createNavigation();
        if(this.#options.pagination){
            this.#createPagination();
        }
        this.#carousselOnMobile();
        if (this.#options.infinite){
            this.offset=this.#slideVisible;
            if(this.offset>this.children){
                console.error("pas assez d'élémént por le caroussel")
            }
            this.items=[...this.items.slice(-this.offset).map(item=>item.cloneNode(true)), ...this.items,...this.items.slice(0,this.offset).map(item=>item.cloneNode(true))];
            this.goTo(this.offset, false);
        }
        this.items.forEach(item=>this.carouselContainer.append(item))
        this.#setStyle();
        if(this.#callBackForSlide.length>0){
            this.#callBackForSlide.forEach(cb=>cb(this.currentItem));
        };
        this.#onResize = this.#carousselOnMobile.bind(this);
        window.addEventListener("resize", this.#onResize);
        this.#root.addEventListener('keyup', e=>{
            if(e.key==='ArrowRight' || e.key==='Right'){
                this.next();
            }else if(e.key==='ArrowLeft' || e.key==='Left'){
                this.prev();
            }
        })
        
        if(this.#options.infinite){
            this.carouselContainer.addEventListener('transitionend',this.resetInfinite.bind(this));
        }

        new CarousselTouchPlugin(this)
    }
    
    translate(percent){
        this.carouselContainer.style.transform = "translate3d("+percent+"%, 0, 0)";
    }

    /**
     * @returns {number} 
     */
    get containerWidth(){
        return this.carouselContainer.offsetWidth
    }

    get carouselWidth(){
        return this.#root.offsetWidth
    }
    /**fonction pour modifier le CSS des contenue du carousel dinamiquement selon la ratio */
    #setStyle(){
        const ratio=this.items.length/this.#slideVisible;
        this.carouselContainer.style.width=(ratio*100)+'%';
        this.items.forEach((item) => {
            item.style.width=(100/this.#slideVisible)/ratio+'%';
        });
    }

    #createNavigation(){
        const nextButtom= this.#createDivWithClass("carousel__next");
        const prevButtom= this.#createDivWithClass("carousel__prev");
        this.#root.append(nextButtom);
        this.#root.append(prevButtom);
        nextButtom.addEventListener('click',this.next.bind(this));
        prevButtom.addEventListener('click',this.prev.bind(this));
        if (this.#options.loop==false){
            this.#onSlide(index=>{
                if(index==0){
                    prevButtom.classList.add('caroussel_prev_hidden');
                }else{
                    prevButtom.classList.remove('caroussel_prev_hidden');
                }
                if(index>=this.items.length || this.items[this.currentItem+this.#slideVisible]===undefined){
                    nextButtom.classList.add('caroussel_next_hidden');
                }else{
                    nextButtom.classList.remove('caroussel_next_hidden');
                }
            });
        }
    }

    #createPagination(){
        const pagination=this.#createDivWithClass('caroussel_pagination');
        this.#root.append(pagination);
        const buttons=[];
        for( let i=0; i< (this.items.length - 2 * this.offset); i=i+this.#slideToScroll){
            const button=this.#createDivWithClass('caroussel_pagination_button');
            button.addEventListener('click',()=>this.goTo(i+this.offset));
            pagination.appendChild(button);
            buttons.push(button);
        }
        this.#onSlide((index)=>{
            const count=this.items.length-2*this.offset
            const activeButton=Math.floor((index-this.offset)/this.#slideToScroll);

            buttons.forEach((button,i)=>{
                if(i===activeButton){
                    button.classList.add('caroussel_pagination_button--active');
                }else{
                    button.classList.remove('caroussel_pagination_button--active');
                }
            })
        })
    }

    prev(){
        this.goTo(this.currentItem-this.#slideToScroll)
    }

    next(){
        this.goTo(this.currentItem+this.#slideToScroll)
    }

    resetInfinite() {
        const totalItems = this.items.length;
    
        // zone réelle (les vrais éléments)
        const minIndex = this.offset;
        const maxIndex = totalItems - this.offset - this.#slideVisible;
    
        // Si on est dans les clones de gauche
        if (this.currentItem < minIndex) {
            this.goTo(this.currentItem + (totalItems - 2 * this.offset), false);
        }
    
        // Si on est dans les clones de droite
        else if (this.currentItem > maxIndex) {
            this.goTo(this.currentItem - (totalItems - 2 * this.offset), false);
        }
    }

    /**
     * Déplace le carousel vers l'élément ciblé
     * @param {number} index
     * @param {boolean} [animation=true] 
     */
    goTo(index, animation=true){
        if(index<0){
            if(this.#options.loop){
                index=this.items.length-this.#slideVisible;
            }else{
                return
            }
        }else if( index>=this.items.length || (this.items[this.currentItem+this.#slideVisible]===undefined&&index>this.currentItem )){
            if(this.#options.loop){
                index=0;
            }else{
                return
            }
        }
        let translateX=index*-100/this.items.length;
        if(animation===false){
            this.desableTransition();
        }
        this.translate (translateX);
        this.carouselContainer.offsetHeight;//force repaint pour qu'il recalcule le layout et prend dans l'ordre l'exécution des changement de CSS 
        if(animation===false){
            this.enableTransition();
        }
        this.currentItem=index;
        if(this.#callBackForSlide.length>0){
            this.#callBackForSlide.forEach(cb=>cb(index))
        };
    }

    #carousselOnMobile(){
        const onMobile=window.innerWidth<800;
        if(onMobile!==this.isMobile){
            this.isMobile=onMobile;
            this.#setStyle();
            if( this.#callBackForSlide.length>0){
                this.#callBackForSlide.forEach(cb=>cb(this.currentItem))
            };
        }
    }

    desableTransition(){
        this.carouselContainer.style.transition='none';
    }

    enableTransition(){
        this.carouselContainer.style.transition='';
    }
    get #slideToScroll(){
        return this.isMobile ? 1 : this.#options.slideToScroll;
    }

    get #slideVisible(){
        return this.isMobile ? 1: this.#options.slideVisible;
    }
    /**
     * 
     * @param {onSlide} cb 
     */
    #onSlide(cb){
        this.#callBackForSlide.push(cb);
    }

    /**
     * function permettant de créer un élément div avec sa class
     * @param {string} classdiv 
     * @returns {HTMLElement}
     */
    #createDivWithClass(classdiv){
        const div= document.createElement('div');
        div.setAttribute('class',classdiv);
        return div;
    }

}

const onRead=function(){
    new Carousel(document.querySelector('.carousel1'),{
        slideToScroll:2,
        slideVisible: 3,
        infinite:true,
        pagination:true
    })

    new Carousel(document.querySelector('.carousel2'),{
        slideToScroll:2,
        slideVisible: 2,
        pagination:true
    })

    new Carousel(document.querySelector('.carousel3'),{
    })
}



document.addEventListener('DOMContentLoaded', onRead) 

