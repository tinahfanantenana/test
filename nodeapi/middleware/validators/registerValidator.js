const {body,validationResult}=require('express-validator');
const registerValidator= [
    body('email')
        .notEmpty()
        .withMessage('Le champ email est obligatoire')
        .bail()
        .isEmail()
        .withMessage('Email invalide')
    ,
    body('username')
        .notEmpty()
        .withMessage('Le champ prenom est obligatoire')
        .bail()
        .isLength({min:5})
        .withMessage('Le champ prenom doit contenir au moins 5 chaines de caractères')
    ,
    body('name')
        .notEmpty()
        .withMessage('Le champ nom est obligatoire')
        .bail()
        .isLength({min:5})
        .withMessage('Le nom doit contenir au moins 5 chaines de caractères')
    ,
    body('password')
        .notEmpty()
        .withMessage('Le champ mot de passe est obligatoire')
        .bail()
        .isLength({min:8})
        .withMessage('Le mot de passe doit contenir minimum 8 caractères ')
    ,
    (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next();
    }
]


module.exports= registerValidator;