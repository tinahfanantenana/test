export class ApiService{
    /**
     * @type {String} 
     */
    #link;
    /**
     * @type {Object}
     */
    #option;

    /**
     * 
     * @param {string} link 
     * @param {object} option 
     */
    constructor (link, option){
        this.#link=link;
        this.#option=option;
    }

    /**
     * 
     * @returns {object}
     */
    async request(){
        try {
            const headers= {'Accept' : 'application/json',...this.#option.headers};
            const r=await fetch(this.#link,{headers,...this.#option})
            if(!r.ok){
                throw new Error(`Erreur serveur : ${r.status}`);
            }
            return r.json();
        } catch (error) {
            console.error('ApiService error:', error)
            throw error
        }
        
    }
}