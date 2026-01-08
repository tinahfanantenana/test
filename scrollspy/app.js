import {ViewRenderer} from './components/ViewRenderer.js';

 const container= document.querySelector('.container');
 const view= new ViewRenderer();
 const navbar= view.createElement('nav', {class: "nav"});
 await view.loadTemplate(navbar,'../components/navbar.html');
 const div= view.createElement('div', {class:"content"});
 await view.loadTemplate(div,'../components/content.html');
 container.append(navbar);
 container.append(div);