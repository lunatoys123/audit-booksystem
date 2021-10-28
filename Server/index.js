const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'tony',
    host:'localhost',
    password:'Lunatoys123',
    database:'lib'
});

app.get("/login",(req, res)=>{
    console.log(req.query);
    res.send("receive in backend");
})

app.listen(3001, ()=>{
    console.log("set up database "+db);
    console.log("Server listen to 3001");
})