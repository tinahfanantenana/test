const express= require('express');
const registerValidator = require('../middleware/validators/registerValidator');
const loginValidator=require('../middleware/validators/loginValidator');
const protect=require('../middleware/auth/protect');
const authCtrl= require('../controllers/authCtrl');
const apiRouter=express.Router();

apiRouter.post('/register/',registerValidator,authCtrl.register);
// apiRouter.post('/login/',loginValidator,authCtrl.login);

module.exports= apiRouter;
