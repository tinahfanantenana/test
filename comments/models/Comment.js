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

    getid(){
        return this.#id;
    }

    getname(){
        return this.#name;
    }

    getbbody(){
        return this.#body;
    }

    toJSON(){
        return {
            id: this.#id,
            name: this.#name,
            body: this.body
        }
    }
}