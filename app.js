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
const lastP=document.querySelector('#lastPosts');
// lastP.insertAdjacentHTML('beforebegin','<h2>Loading...</h2>');
const divPost= document.createElement('div');
lastP.append(divPost);
await fetch('https://jsonplaceholder.typicode.com/posts/?_limit=5',{
    headers:{
        Accept:'application/json'
    }
});   

await setTimeout(()=>{},3000);



const postApi= fetch('https://jsonplaceholder.typicode.com/posts/?_limit=5',{
    headers:{
        Accept:'application/json'
    }
});   
postApi
.then(response=>response.json())
.then(posts=>{
setTimeout(()=>{
    document.querySelector('h2').remove();
    for([property, value] of Object.entries(posts)){
        const postDiv=document.createElement('div');
        postDiv.innerHTML=`
        <h2>${value.title}</h2>
        <p>${value.body}</p>
        `;
        divPost.append(postDiv);
    }
    lastP.append(divPost);
    console.log(posts);
},3000)
    // posts.forEach(post=>{
    //     const postDiv=document.createElement('div');
    //     postDiv.innerHTML=`
    //     <h2>${post.title}</h2>
    //     <p>${post.body}</p>
    //     `;
    //     divPost.appendChild(postDiv);
    // });
    })
.catch(error=>console.log('erreur :'+ error.message));


