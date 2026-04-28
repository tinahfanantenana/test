    import express from 'express';
    import session from 'express-session';
    import flash from './middleware/flash.js';
    

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
    app.use(flash);
    
    app.get('/', (req, resp)=>{
        console.log(req.session);
        resp.render('pages/index');
    });

    app.post('/',(req,resp)=>{
        if(req.body.message===''|| req.body.message===undefined){
            req.flash('error',"il y a une erreur");
            resp.redirect('/');
        }else{
            req.flash('success',"Merci");
            resp.redirect('/');
        }
    });

    app.listen(8000);