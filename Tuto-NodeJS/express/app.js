import express, { response } from 'express';

let app= express();

app.set('view engine', 'ejs');

app.get('/',(req,resp)=>{
    resp.render('page/index',{test:'test pour moi'})
})

app.get('/demo', (request, response)=>{
    response.send('je suis sur demo');
})

app.listen(8000);