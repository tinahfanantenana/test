const {body,validationResult}=require('express-validator');
const registerValidator= [
    body('email')
        .notEmpty()
        .withMessage('Le champ email est obligatoire')
        .isEmail()
        .withMessage('Email invalide')
    ,
    body('username')
        .notEmpty()
        .withMessage('Le champ prenom est obligatoire')
        .isLength({min:5})
    ,
    body('name')
        .notEmpty()
        .withMessage('Le champ nom est obligatoire')
        .isLength({min:5})
    ,
    body('password')
        .notEmpty()
        .withMessage('Le champ mot de passe est obligatoire')
        .isLength({min:8})
    ,
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!empty(errors)){
            
        }
        next();
    }
]


module.exports= registerValidator;