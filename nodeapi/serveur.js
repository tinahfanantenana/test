const express = require('express');
const userRoute=require('./routers/userRouter');
const authRoute=require('./routers/authRouter')


const server=express();

server.use(express.urlencoded({extended: true}))

server.use('/auth', authRoute);
server.use('/user',userRoute);

server.get('/',function(req,res){
    res.setHeader('Content-type','text/html');
    res.status(200);
    res.send('<h1>Bonjour</h1>');
})

server.listen(8000,()=>{console.log('serveur en ecoute ')}); 