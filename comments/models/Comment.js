export class Comment{
    /**
     * @type {number}
     */
    #id;
    #postId;
    
    /**
     * @type {string}
     */
    #name;
    #email;

    /**
     * @type {string}
     */
    #body;

    constructor({id, name, body}={}){
        this.#body=body;
        this.#id=id??Date.now();
        this.#name=name;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get body(){
        return this.#body;
    }

    toJSON(){
        return {
            id: this.#id,
            name: this.#name,
            body: this.#body
        }
    }
}