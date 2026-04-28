    export default function(req, res, next){

        
        res.locals.flash=req.session.flash??{};
        delete req.session.flash;    

        req.flash= function(type, content){
            if(req.session.flash===undefined){
                req.session.flash={}
            }
            req.session.flash[type]=content;
        }
        
        next();
    }