require('dotenv').config();
const express = require('express');
const userRoute=require('./routers/userRouter');
const authRoute=require('./routers/authRouter');


const server=express();

server.use(express.json())
server.use(express.urlencoded({extended: true}));


server.use('/auth', authRoute);
server.use('/user',userRoute);

server.get('/',function(req,res){
    res.status(200);
    res.redirect('/login.html');
})

server.listen(8000,()=>{console.log('serveur en ecoute ')}); 