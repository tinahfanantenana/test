// console.log(setTimeout(()=>console.log,5000));  
// const ul= document.querySelector('ul li:first-child');
// // ul.setAttribute("hidden","hidden");
// console.log(ul.getAttribute("class"));
// setInterval(()=>ul.classList.toggle('red'),1000);
// const li=document.querySelector('ul li:first-child');
// const li=lis.classList
// setInterval(()=>li.toggle('red'),1000); 
// console.log(li.style.color='blue')
// console.log(getComputedStyle(li).color);
// const newLi= document.createElement('li')
// newLi.innerHTML= "Bonjour"
// document.querySelector('ul').append(newLi); //prepend met au debut des contenu ou éément enfant de l'element;
// const ul=document.querySelector('ul');
// const div= document.createElement('div');
// div.innerHTML="Bonjour les gens"
// ul.insertAdjacentElement('afterbegin', div);


/**
 * est une fonction qui crée un article HTML à partir d'un objet post
 * @param {{title:string, body:string}} post
 * @returns {HTMLElement}
 */
function creatArticle(post){
    const article = document.createElement('article');
    //Pour raison de sécutité cette methode d'ajout d"élément n'est pas tres récommandé puisque si l'Api n'est pas fiable ou s'il y a des injection HTML dans leurs contenu ceci risque de causé des problème ou engendre des erreurs
        // article.innerHTML = `
        //     <h2>${post.title}</h2>
        //     <p>${post.body}</p>
        // `;
    article.append(createElementWithText('h2',post.title));
    article.append(createElementWithText('p',post.body));
    return article;
}

/**
 * un fonction qui crée un élément HTML avec du texte
 * @param {String} tagName 
 * @param {String} content 
 * @returns {HtmlElement}
 */
function createElementWithText(tagName, content){
    const element = document.createElement(tagName);
    element.innerHTML=content;
    return element;
}

/**
 * une fonction asynchrone qui charge et affiche les posts
 * @returns {Promise<void>}
 */
async function loadPosts() {
    try{
        const lastP = document.querySelector('#lastPosts');

        const divPost = document.createElement('div');
        divPost.innerHTML = '<h2>Loading...</h2>';
        lastP.append(divPost);
    
        // attendre 3 secondes
        await new Promise(resolve => setTimeout(()=>{
            // Remove loading
            divPost.innerHTML = "";
            resolve()}, 3000));
    
        // fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
            headers: { Accept: 'application/json' }
        });
        
        if(!response.ok){
            throw new Error('erreur serveur');
        }

        const posts = await response.json();
    
        
    
        // afficher les posts
        posts.forEach(post => {
            divPost.append(creatArticle(post));
        });
    }catch(e){
        divPost.innerHTML="Impossible de chargé les articles"
        divPost.style.color="red";
        console.log()
    }
    
}

loadPosts();
