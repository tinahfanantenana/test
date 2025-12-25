import { TchequeAPI } from "../Models/api.js";
import { ToDolist } from "../Models/toDolist.js";


try{
    // const data=new TchequeAPI("https://jsonplaceholder.typicode.com/todos/?_limit=5");
    // const todos=await data.fetchAPI();
    let todos=[];
    let storage=localStorage.getItem('todos');
    // console.log(localStorage.getItem('todos'))
    // console.log(localStorage.getItem('todos').toString())
    // console.log(JSON.parse(localStorage.getItem('todos').toString()))
    if(storage){
        todos=JSON.parse(storage);
    }    
    const list=new ToDolist(todos);
    list.appendTo(document.querySelector('#todolist'));
}catch(error){
    console.log(error);
}