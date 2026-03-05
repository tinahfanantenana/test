

class Carousel{
    #element;
    #options;
    #carouselContainer;
    #items;
    #root;
    #currentItem;
    #callBackForSlide;

    /**
     * @callback hideSlider
     * @param {number} index
     */

    /**
     * @param {HTMLElement} element 
     * @param {object} option
     * @param {number} [option.slideToScroll=1]
     * @param {number} [option.slideVisible=1]
     * @param {boolean} [options.loop=false] 
     */
    constructor(element, options={}){
        if (!element) {
            throw new Error("Carousel: element not found");
        }
        this.#element=element;
        this.isMobile=false;
        this.#options={slideToScroll:1,slideVisible:1,loop:false, ...options};
        this.#currentItem=0;
        this.#callBackForSlide=null;
        const childs=[...element.children];
        this.#root= this.#createDivWithClass('carousel');
        this.#carouselContainer= this.#createDivWithClass('carousel__container');
        this.#root.appendChild(this.#carouselContainer);
        this.#root.setAttribute('tabindex','0');
        element.appendChild(this.#root);
        this.#items=childs.map( (child) => {
            const item=this.#createDivWithClass('carousel__item');
            item.append(child);
            this.#carouselContainer.append(item);
            return item
        });
        this.#setStyle();
        this.#createNavigation();
        if( this.#callBackForSlide){
            this.#callBackForSlide(0);
        };
        this.#carousselOnMobile();
        window.addEventListener("resize",this.#carousselOnMobile.bind(this))
        this.#root.addEventListener('keyup', e=>{
            if(e.key==='ArrowRight'){
                this.#next();
            }else if(e.key==='ArrowLeft'){
                this.#prev();
            }
        })
    }
    

    /**fonction pour modifier le CSS des contenue du carousel dinamiquement selon la ratio */
    #setStyle(){
        const ratio=this.#items.length/this.#slideVisible;
        this.#carouselContainer.style.width=(ratio*100)+'%';
        this.#items.forEach((item) => {
            item.style.width=(100/this.#slideVisible/ratio)+'%';
        });
    }

    #createNavigation(){
        const nextButtom= this.#createDivWithClass("carousel__next");
        const prevButtom= this.#createDivWithClass("carousel__prev");
        this.#root.append(nextButtom);
        this.#root.append(prevButtom);
        nextButtom.addEventListener('click',this.#next.bind(this));
        prevButtom.addEventListener('click',this.#prev.bind(this));
        if (this.#options.loop==false){
            this.#hideSlider(index=>{
                if(index==0){
                    prevButtom.classList.add('caroussel_prev_hidden');
                }else{
                    prevButtom.classList.remove('caroussel_prev_hidden');
                }
                if(index>=this.#items.length || this.#items[this.#currentItem+this.#slideVisible]===undefined){
                    nextButtom.classList.add('caroussel_next_hidden');
                }else{
                    nextButtom.classList.remove('caroussel_next_hidden');
                }
            });
        }
    }

    #prev(){
        this.#goTo(this.#currentItem-this.#slideToScroll)
    }

    #next(){
        this.#goTo(this.#currentItem+this.#slideToScroll)
    }

    /**
     * Déplace le carousel vers l'élément ciblé
     * @param {number} index 
     */
    #goTo(index){
        if(index<0){
            index=this.#items.length-this.#slideVisible;
        }else if( index>=this.#items.length || (this.#items[this.#currentItem+this.#slideVisible]===undefined&&index>this.#currentItem )){
            index=0;
        }
        let translateX=index*-100/this.#items.length;
        this.#carouselContainer.style.transform = "translate3d("+translateX+"%, 0, 0)";
        this.#currentItem=index;
        if( this.#callBackForSlide){
            this.#callBackForSlide(index)
        };
    }

    #carousselOnMobile(){
        const onMobile=window.innerWidth<800;
        if(onMobile!==this.isMobile){
            this.isMobile=onMobile;
            this.#setStyle();
            if( this.#callBackForSlide){
                this.#callBackForSlide(this.#currentItem)
            };
        }
    }

    get #slideToScroll(){
        return this.isMobile ? 1 : this.#options.slideToScroll;
    }

    get #slideVisible(){
        return this.isMobile ? 1: this.#options.slideVisible;
    }
    /**
     * 
     * @param {hideSlider} cb 
     */
    #hideSlider(cb){
        this.#callBackForSlide=cb;
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


document.addEventListener('DOMContentLoaded', function(){
    new Carousel(document.querySelector('.carousel1'),{
        slideToScroll:2,
        slideVisible: 3,
        loop:true
    })

    new Carousel(document.querySelector('.carousel2'),{
        slideToScroll:2,
        slideVisible: 2,
    })

    new Carousel(document.querySelector('.carousel3'),{
    })
}) 

