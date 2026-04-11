import express, { response } from 'express';

let app= express();

app.get('/',(req,resp)=>{
    resp.send('salut tu es à la racine');
})

app.get('/demo', (request, response)=>{
    response.send('je suis sur demo');
})

app.listen(8000);