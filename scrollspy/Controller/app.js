import {ViewRenderer} from '../View/ViewRenderer.js';
import { Scrollspy } from '../Model/Scrollspy.js';
let container= document.querySelector('.container');
let view=new ViewRenderer;
let menu=view.createElement('div', {class:'btn-groupe mt-1 position-fixed',id:'menu'});
view.loadTemplate(menu,'../View/navbar.html')
let content=view.createElement('div', {class:'bg-body-tertiary pt-4 rounded-2',id:'scrollSpy'});
view.loadTemplate(content,'../View/content.html')
container.append(menu);
container.append(content);
