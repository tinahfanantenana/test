const express = require('express');


const server=express();

server.get('/',function(req,res){
    res.setHeader('Content-type','text/html');
    res.status(200);
    res.send('<h1>Bonjour</h1>');
})

server.listen(8000,()=>{console.log('serveur en ecoute ef ecore ')});