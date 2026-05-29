const express= require('express');
const authCtrl= require('../controllers/authCtrl');
const apiRouter=express.Router();

apiRouter.post('/register/',authCtrl.register);
apiRouter.post('/login/',authCtrl.login);

module.exports= apiRouter;
