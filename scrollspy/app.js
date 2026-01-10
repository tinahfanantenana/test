import {ViewRenderer} from './components/ViewRenderer.js';
import { ScrollSpy } from './modules/Scrollspy.js';
import { debounce } from './utils/debounce.js';

 const container= document.querySelector('.container');
 const view= new ViewRenderer();
 const navbar= view.createElement('nav', {class: "nav nav-tabs navbar-expand-lg navbar-light bg-light fixed-top"});
 await view.loadTemplate(navbar,'../components/navbar.html');
 const div= view.createElement('div', {class:"content"});
 await view.loadTemplate(div,'../components/content.html');
 container.append(navbar);
 container.append(div);

const contents=document.querySelector('.content');
const nav=document.querySelector('.nav');

let observer=new ScrollSpy(contents,nav);
observer.activeMenu();
window.addEventListener('resize',debounce(function(){observer.activeMenu()},500));