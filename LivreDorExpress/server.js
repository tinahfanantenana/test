    import express from 'express';
    import session from 'express-session';

    const app= express();

    app.set('view engine', 'ejs');
    if (process.env.NODE_ENV === 'production') {
        app.set('trust proxy', 1);
    };

    app.use(express.static('public'));
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.NODE_ENV === 'production' }
    }));

    
    app.get('/', (req, resp)=>{
        console.log(req.session.error);
        resp.locals.error=req.session.error;
        req.session.error=undefined;
        resp.render('pages/index');
    });

    app.post('/',(req,resp)=>{
        if(req.body.message===''|| req.body.message===undefined){
            req.session.error='il y a une errreur'
            resp.redirect('/');
        }else{
            console.log(req.body.message);
            resp.redirect('/');
        }
    });

    app.listen(8000);