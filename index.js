import express from 'express';
import connect from './db/conn.js';
import {user} from './models/user.js';
import notes from './models/noteSchema.js';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import auth from './middleware/auth.js';
import mongoose from 'mongoose';

const app = express();

connect();

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
 res.send("hello");
});

app.get('/notes',auth,(req,res)=>{
    const Notes = notes.find({creator:req.user}).then((Notes)=>{
        res.json({notes:Notes});
    }).catch(e=>console.log(e));
    
})

app.post('/notes',auth,(req,res)=>{
    const title = req.body.title;
    const task = req.body.task;
    const creator = req.user;
    const note = new notes({title:title,task:task,creator:creator});
    note.save().then(()=>{
        res.json({data:note});
    }).catch(e=>res.json({message:e}));
})

app.delete('/notes/:id',auth,(req,res)=>{
    const id = req.params.id.split(':')[1];
    notes.findByIdAndDelete(id).then(()=>res.json({message:"deleted successfully"}))
    .catch(e=>res.json({error:e+"sik"}));
})

app.post('/api/register',(req,res)=>{
    const username = req.body.username;
    const password  = req.body.password;
    const User = new user({username:username,password:password});
    User.save(function(e){
        if(e){
            console.log(e);
            res.json({error:e})
        }else{
            const token = jwt.sign({
                username:username
            },'secret123')
            res.json({user:token});
        }
    })
})

app.post('/api/login',(req,res)=>{
    console.log("hello");
    const username = req.body.username;
    const password = req.body.password;
    user.findOne({username:username,
        password:password})
        .then((data)=>{
            if(data==null){
                return res.json({user:null});
            }
            console.log(data);
        const token = jwt.sign({
            username:username
        },'secret123');
        res.json({user:token});
    }).catch((err)=>{
        console.log(err);
        res.json({error:err});
    })
})

app.listen(2000,()=>{
    console.log("server started");
})