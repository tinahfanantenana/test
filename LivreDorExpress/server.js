import express from 'express';

const app= express();


app.get('/', (req, resp)=>{
    resp.send('heloo word');
})
app.listen(8000)
