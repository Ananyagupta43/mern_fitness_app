const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express=require('express');
const app=express();
dotenv.config({path:'./config.env'});
//Middleware


const PORT=process.env.PORT
require('./db/conn');
app.use(express.json());


app.use(require('./router/auth')); //in this file we will have all the routes and we are using middleware for them.


//const User=require('./models/userSchema');

// const middleware=(req,res,next)=>{      //using middleware to make sure user is able to see login page if not logged in and is accessing about us.

//     console.log(`hello user`);
// next();                           //if user is logged in then we are ccalling next.
// } 



// app.get('/',(req,res)=>{
// res.send("Hello world")
// })

// app.get('/aboutUs',middleware,(req,res)=>{      //if user logged in then only he can access about us thats why we have added middleware
 
//     res.send("Hello about")
//     })


// app.get('/login',(req,res)=>{
// res.send("Hello login")
// })


// app.get('/signUp',(req,res)=>{
//     res.send("Hello signup")
//     })

// app.get('/exercisesPage',(req,res)=>{
//         res.send("Hello exercise")
//  })

app.listen(PORT,()=>{
    console.log(`running on ${PORT}`);
})