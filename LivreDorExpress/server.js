import express from 'express';

const app= express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, resp)=>{
    resp.render('pages/index',{test:"salut"});
})

app.listen(8000)
