import http from 'node:http';
import {readFile} from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname,join } from 'node:path';
import { parse } from 'node:url';

const __filename=fileURLToPath(import.meta.url);
const __dirname= dirname(__filename);
console.log(__dirname);
let server = http.createServer();
server.on('request',async (request,response)=>{ 
    const myurl=new URL(request.url,`http://${request.headers.host}`);
    if (myurl.pathname === '/favicon.ico') {
        response.writeHead(204);
        return response.end(); // ignore
    }else if(myurl.pathname === '/'){
        try{
            const __filepath= join(__dirname,'index.html');
            console.log(__filepath);
            let data=await readFile(__filepath,'utf-8');
            const name=myurl.searchParams.get('name')??'anonyme';
            data=data.replace("{{name}}",name);
            response.writeHead(200);
            return response.end(data);
        }
        catch(err){
            response.writeHead(404,{
                "Content-type":"text/html;charset=utf-8"
            });
            return response.end("ce fichier n'existe pas");
        }
    }
});
server.listen(8080);
