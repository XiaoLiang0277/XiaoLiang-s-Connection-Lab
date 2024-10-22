//let express = require('express');
let app = express();
import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';



const defaultData = {coffeeTrackerData:[]};
const adapter = new JSONFile('db.json');
const db = new Low(adapter,defaultData);


app.use(express.json());

let coffeeTracker = [];

app.post('/noCups',(req,res)=>{
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        coffee: req.body.number
    }
   // coffeeTracker.push(obj);
   // console.log(coffeeTracker);
    db.data.coffeeTrackerData.push(obj);
    db.write()
        .then(()=>{
            res.json({task:"success"});
    })
})

app.use('/',express.static('public'));
app.listen(5000,()=>{
    console.log('listening at 5000')
})


app.get('/getCups',(req,res)=>{
    //let obj = {data: coffeeTracker};
    db.read()
    .then(()=>{
        let obj = {data: db.data.coffeeTrackerData}
        res.json(obj);
    })
    
})