import {ViewRenderer} from '../View/ViewRenderer.js';
import { Scrollspy } from '../Model/Scrollspy.js';
let container= document.querySelector('.container');
let view=new ViewRenderer;
let menu=view.createElement('div', {class:'btn-group mt-1 position-fixed',id:'menu'});
await view.loadTemplate(menu,'../View/navbar.html')
let content=view.createElement('div', {class:'bg-body-tertiary pt-4 rounded-2',id:'scrollSpy'});
await view.loadTemplate(content,'../View/content.html')
container.append(menu);
container.append(content);

const menus=menu.querySelectorAll('.btn-group button');
menus.forEach(menu=>{
    menu.addEventListener('click',(e)=>{
    const scrollSpy= new Scrollspy;
    scrollSpy.menuActive(e);
    console.log(e)
    })
});

// const obs= new IntersectionObserver((observers)=>{
//     for (let o in observers){
//         if(o.isIntersecing){
//             const acticeMenu= new Scrollspy;
//             activeMenu.acticeMenu();
//         }
//     }
// })
// obs.observe(target)