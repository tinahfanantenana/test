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
function creatArticle(post){
    const article = document.createElement('article');
        article.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        return article;
}

async function loadPosts() {
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

    const posts = await response.json();

    

    // afficher les posts
    posts.forEach(post => {
        divPost.append(creatArticle(post));
    });
}

loadPosts();
