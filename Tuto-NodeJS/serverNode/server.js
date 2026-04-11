import http from 'node:http';
import {readFile} from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname,join } from 'node:path';
import { EventEmitter } from 'node:events';

const __filename=fileURLToPath(import.meta.url);
const __dirname= dirname(__filename);
console.log(__dirname);
// let server = http.createServer();
// const myurl=new URL(request.url,`http://${request.headers.host}`);
// server.on('request',async (request,response)=>{ 
//     if (myurl.pathname === '/favicon.ico') {
//         response.writeHead(204);
//         return response.end(); // ignore
//     }else if(myurl.pathname === '/'){
//         try{
//             const __filepath= join(__dirname,'index.html');
//             console.log(__filepath);
//             let data=await readFile(__filepath,'utf-8');
//             const name=myurl.searchParams.get('name')??'anonyme';
//             data=data.replace("{{name}}",name);
//             response.writeHead(200);
//             return response.end(data);
//         } 
//         catch(err){
//             response.writeHead(404,{
//                 "Content-type":"text/html;charset=utf-8"
//             });
//             return response.end("ce fichier n'existe pas");
//         }
//     }
// });
// server.listen(8080);

let App={
    start:function (port){
        let emiter = new EventEmitter();
        let server= http.createServer();
        server.on('request',(request,response)=>{
            const myurl=new URL(request.url,`http://${request.headers.host}`);
            if(myurl.pathname==='/'){ 
                emiter.emit("root",response)
                return;
            };
            response.writeHead(404);
            response.end('Not found');
        });
        server.listen(port)
        return emiter;

    }
}
const app= App.start(8000);
app.on('root',(response)=>{
    response.writeHead('200',{
        "Content-Type": "text/plain"
    })
    response.end('je suis à la racine');
})