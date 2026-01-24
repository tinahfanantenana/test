/**
 * @typedef {object} Comments
 * 
 */
export class Comment{
    #id;
    #postId;
    #name;
    #email;
    #body;

    constructor(id, name, body){
        this.#body=body;
        this.#id=id;
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