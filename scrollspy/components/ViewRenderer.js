export class ViewRenderer{

    /**
     * fonction pour créer un élément HTML
     * @param {string} tag 
     * @param {object} attributs 
     * @returns {HTMLElement}
     */
    createElement(tag,attributs={}){
        let element=document.createElement(tag);
        this.setAtrtibuts(element,attributs);
        return element;
    }

    /**
     * 
     * @param {string} element 
     * @param {object} attributs 
     */
    setAtrtibuts(element,attributs={}){
        for(let attribut in attributs ){
            element.setAttribute(`${attribut}`,`${attributs[attribut]}`);
        }
    }
    /**
     * fonction pour charger une template
     * @param {string} target 
     * @param {string} path 
     */
    async loadTemplate(target,path){
        let template= await fetch(path);
        let result=await template.text();

        target.innerHTML=await result;
    }
}