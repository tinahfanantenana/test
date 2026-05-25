const express= require('express');
const authCtrl= require('../controllers/authCtrl');
const apiRouter=express.Router();

apiRouter.post('/user/register/',authCtrl.register);
apiRouter.post('/user/login/',authCtrl.login);

module.exports= apiRouter;
