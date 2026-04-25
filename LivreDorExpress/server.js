    import express from 'express';

    const app= express();

    app.set('view engine', 'ejs');

    app.use(express.static('public'));
    app.use(express.urlencoded())
    app.use(express.json())

    app.get('/', (req, resp)=>{
        resp.render('pages/index');
    })

    app.post('/',(req,resp)=>{
        console.log(req.body);
    })
    app.listen(8000)
