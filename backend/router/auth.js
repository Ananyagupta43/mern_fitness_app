const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// const middleware = (req, res, next) => {      //using middleware to make sure user is able to see login page if not logged in and is accessing about us.

//     console.log(`hello user`);
//     next();                           //if user is logged in then we are ccalling next.
// }

router.get('/', (req, res) => {
    res.send("Hello world from server router js");
})

// router.get('/aboutUs', middleware, (req, res) => {      //if user logged in then only he can access about us thats why we have added middleware

//     res.send("Hello about");
// })


require('../db/conn');
const User = require('../models/userSchema');

//using promises
// router.post('/signUp',  (req,res)=>{
//     const {first_name,last_name,email,phone,password}=req.body;

//    if( !first_name ||  !email || !phone || !password ){
//     return res.status(422).json({error:"Please fill all the fields"});
//    }

//    User.findOne({"$or": [ { email: email }, { phone: phone} ]})    // we are checking whether the email in database is same as that one filled by user
// .then((userExists)=>{                //findOne returns a promise
//     if(userExists){       
//         return res.status(422).json({error:"User already exists."});    
//     }
//  const user =new User({first_name,last_name,email,phone,password});      //here we have created an instance of user

// user.save().then(()=>{
// res.status(201).json({message:"User registered successfully"});    
// }).catch((err)=>{
//     res.status(500).json({message:"Unable to register"});    

// })

// }).catch((err)=>{
//     res.status(500).json({message:"Unable to register"});    
// })                           
//     });


//using async await
router.post('/signUp', async (req, res) => {
    const { first_name, last_name, email, phone, password } = req.body;

    if (!first_name || !email || !phone || !password) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {

        const userExists = await User.findOne({ "$or": [{ email: email }, { phone: phone }] })    // we are checking whether the email in database is same as that one filled by user

        if (userExists) {
            return res.status(422).json({ error: "Email or phone already exists." });
        }

        const user = new User({ first_name, last_name, email, phone, password });      //here we have created an instance of user

        //encrypting password first before saving
        const userRegister = await user.save();
        if (userRegister) {
            res.status(201).json({ message: "User registered successfully" });

        } else {
            res.status(500).json({ message: "Unable to register" });

        }

    }
    catch (err) {
        res.status(500).json({ message: "Unable to register" });

    }


});

//login method

router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });

        }

        const loginUser = await User.findOne({ email: email });   //loginUser will be filled with all the details if emails match 
        if (!loginUser) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, loginUser.password);   // from all those details we are comparing the passwords

        const token = await loginUser.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        if (!isMatch) {
            res.json({ message: "Invalid Credentials" });
        } else {
            res.json({ message: "Login Successful" });

        }

    } catch (err) {
        console.log(err);
    }


})

router.get('/exercisesPage', authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.get('/GetStarted', authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.get('/logout', authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((element) => {
            return element.token !== req.token;
        })
        res.clearCookie("jwtoken");
        await req.rootUser.save();
        return res.status(200).json({ error: "Logged out Successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;