const express= require('express');
const userCtrl=require ('../controllers/userCtl');
const userApi= express();

userApi.get('/me',protect,userCtrl.getProfil);
userApi.put('/me',protect,userCtrl.update);
userApi.delete('/me',protect,userCtrl.remove);

return userApi;