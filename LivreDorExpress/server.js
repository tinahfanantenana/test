    import express from 'express';
    import session from 'express-session';
    import flash from './middleware/flash.js';
    import { Message } from './models/Message.js';

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
    
    app.get('/', async (req, resp)=>{
        try {
            const mess=new Message;
            resp.locals.allMessage= await  mess.all();
            resp.render('pages/index');  
        } catch (error) {
            console.log(error)
        }
    });

    app.post('/',async (req,resp)=>{
        if(req.body.message===''|| req.body.message===undefined){
            req.flash('error',"il y a une erreur");
            resp.redirect('/');
        }else{
            try {
                const mess=new Message;
                await mess.create(req.body.message);
                req.flash('success',"Merci");
                resp.redirect('/');
            } catch (error) {
                console.log(error);
            }
            
        }
    });

    app.listen(8000);