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


}