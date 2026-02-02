import { ForDom } from "../ForDom.js";

/**
 * 
 * @param {string} message 
 * @returns {HTMLElement}
 */
export function showError(message){
    const forDom=new ForDom();
    const template = forDom.cloneTemplate("#alert");
    template.querySelector('.js-text').innerText=message;
    template.querySelector('button').addEventListener('click', e=>{
        e.preventDefault();
        template.remove();
        template.dispatchEvent(new CustomEvent('close'));
    })
    return template;
}