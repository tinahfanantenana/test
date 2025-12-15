export class TchequeAPI{
    #url="";
    #option={};
    constructor(url, option={}){
        this.#url=url;
        this.#option=option;
    }
    async fetchAPI(){
        const headers= {'Accept': 'application/json',...this.#option.headers};
        const r =await fetch(this.#url,{headers,...this.#option});
        if(!r.ok){
            throw new Error(`Erreur serveur : ${r.status}`);
        }
        return r.json();
    }
}   