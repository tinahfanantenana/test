class Caroussel{
    #element;
    #options;

    /**
     * @param {HTMLElement} element 
     * @param {object} option
     * @param {number} option.slideToScroll
     * @param {number} option.slideVisible
     */
    constructor(element, options={}){
        this.#element=element;
        this.#options={slideToScroll:1,slideVisible:1, ...options};
        const childs=[...element.children];
        const ratio=childs.length/this.#options.slideVisible;
        const root= this.#createDivWithClass('carroussel');
        const carousselContainer= this.#createDivWithClass('carroussel__container');
        carousselContainer.style.width=(ratio*100)+'%';
        root.appendChild(carousselContainer);
        element.appendChild(root);
        childs.forEach( (child) => {
            const item=this.#createDivWithClass('carroussel__item');
            item.append(child);
            item.style.width=(100/this.#options.slideVisible/ratio)+'%';
            carousselContainer.append(item);
        });
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
    new Caroussel(document.querySelector('.caroussel1'),{
        slideVisible: 3
    })

    new Caroussel(document.querySelector('.caroussel2'),{
        slideVisible: 2
    })
}) 

