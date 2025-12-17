import { TchequeAPI } from "../Models/api.js";
import { ToDolist } from "../Models/toDolist.js";


try{
    const data=new TchequeAPI("https://jsonplaceholder.typicode.com/todos/?_limit=5");
    const todos=await data.fetchAPI();
    const list=new ToDolist(todos);
    list.appendTo(document.querySelector('#todolist'));
}catch(error){
    console.log(error);
}