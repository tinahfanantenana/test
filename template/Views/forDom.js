export class ForDom{


    /**
     * 
     * @param {string} tag 
     * @param {object} attributes 
     * @returns {HTMLElement}
     */
    createElement(tag, attributes={}){
        const element=document.createElement(tag);
        this.setAttributes(element, attributes);
        return element;
    }  


    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} attributes 
     */
    setAttributes(element, attributes){
        for (let [key, value] of Object.entries(attributes)){
            if(value!==null){
                element.setAttribute(key, value);
            }
        }
   }

   /**
    * permet de charger un template html
    * @param {string} path 
    * @param {string} id
    */
   async loadTemplate(path){
        const reponse= await fetch(path);
        const templatetostring=await reponse.text();
   }
   
    /**
     * permet de cloner un template
     * @param {String} id 
     * @returns {DocumentFragment}
     */
    cloneTemplate(id){
        const template=document.getElementById(id);
        if(!template){
            throw new Error(`Le template ${id} est introuvable`);
        }
        return template.content.cloneNode(true);
    }

}