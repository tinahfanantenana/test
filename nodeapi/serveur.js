const express = require('express');
const boduParser= require('body-parser');


const server=express();

server.use(boduParser.urlencoded({extended: true}))

server.get('/',function(req,res){
    res.setHeader('Content-type','text/html');
    res.status(200);
    res.send('<h1>Bonjour</h1>');
})

server.listen(8000,()=>{console.log('serveur en ecoute ')});