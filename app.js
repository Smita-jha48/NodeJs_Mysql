const express= require('express');
const mysql = require('mysql');

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'smit@JHA2001',
    database : 'nodemysql'
   
});

//Connect
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Mysql Connected');
});

const app = express();

//Create DB
app.get('/createdb',(req,res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created');
    });
});
//Create table
app.get('/createpoststable',(req,res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255), PRIMARY KEY (id))';

    db.query(sql,(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.send('table created');
    });
});
//Insert post
app.get('/addpost1', (req,res)=>{
    let post = {title: 'Post One', body:'This is post number 1'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err)throw err;
        console.log(result);
        res.send('Post Data inserted');
    });

});

app.listen('3000',() => {
    console.log('server started')
})