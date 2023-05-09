const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const nodemailer = require('nodemailer')

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
            res.status(500).json({ message: "Email or phone already exists" });

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
            res.json({
                message: "Login Successful",
                "jwtoken": token,
                "email": email
            }
            );

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

router.get('/profile', authenticate, (req, res) => {
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

router.put('/update', async (req, res) => {

    try {

        if (!req.body.first_name || !req.body.last_name || !req.body.phone || !req.body.email) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        await User.findByIdAndUpdate(req.body._id, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email
        });
        return res.status(200).json({ message: "Details Updated Successfully" });

    } catch (err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});

router.post('/calculatingBmi', authenticate, async (req, res) => {
    try {

        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: '22222guptakrishna@gmail.com',
                password: process.env.PASSWORD,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }

        })
        let info = await transporter.sendMail({
            from: "22222guptakrishna@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: "Your BMI results: ", // Subject line
            text: "Your height is " + req.body.height + "cm, your weight is " + req.body.weight + "kg, and the result of you bmi is " + req.body.bmi + "kg/m². Thanks for using exercisopedia in your fitness journey." // plain text body

        });
        //console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ message: "Results are forwarded to your Email ID" });

    } catch (err) {
        res.status(500).json({ message: "Unable to register" });
    }



});

router.post('/calculatingBMR', async (req, res) => {
    try {

        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: '22222guptakrishna@gmail.com',
                password: process.env.PASSWORD,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }

        })
        let info = await transporter.sendMail({
            from: "22222guptakrishna@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: "Your BMR results: ", // Subject line
            text: "Your height is " + req.body.height + "cm, your weight is " + req.body.weight + "kg, your age is " + req.body.age + "yrs, your gender is " + req.body.gender + ", and the result of you bmr is " + req.body.bmr + "Calories/day. Thanks for using exercisopedia in your fitness journey." // plain text body

        });
        //console.log("Message sent: %s", info.messageId);
        return res.status(200).json({ message: "Results are forwarded to your Email ID" });

    } catch (err) {
        res.status(500).json({ message: "Unable to register" });
    }
});

router.post('/calculatingBodyFat', async (req, res) => {
    try {

        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: '22222guptakrishna@gmail.com',
                password: process.env.PASSWORD,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }

        })
        let info = await transporter.sendMail({
            from: "22222guptakrishna@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: "Your Body Fat results: ", // Subject line
            text: "Your height is " + req.body.height + "cm, your gender is " + req.body.gender + ", your neck is " + req.body.neck + "cm, your waist is " + req.body.waist + "cm, your hips are " + req.body.hips + "cm, and the result of you body fat is " + req.body.bodyFat + "%. Thanks for using exercisopedia in your fitness journey." // plain text body

        });

        return res.status(200).json({ message: "Results are forwarded to your Email ID" });

    } catch (err) {
        res.status(500).json({ message: "Unable to register" });
    }
});

router.post('/calculatingCalorie', async (req, res) => {
    try {

        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: '22222guptakrishna@gmail.com',
                password: process.env.PASSWORD,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }

        })
        let info = await transporter.sendMail({
            from: "22222guptakrishna@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: "Your Calories results: ", // Subject line
            text: "Your height is " + req.body.height + "cm, your gender is " + req.body.gender + ", your weight is " + req.body.weight + "kg, your age is " + req.body.age + "yrs, your activity percantage is " + req.body.activity + ", and the result of you calories is " + req.body.calories + " calories/day. Thanks for using exercisopedia in your fitness journey." // plain text body

        });
        return res.status(200).json({ message: "Results are forwarded to your Email ID" });

    } catch (err) {
        res.status(500).json({ message: "Unable to register" });
    }
})

router.post('/calculatingHealthyWeight', async (req, res) => {
    try {

        let transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: '22222guptakrishna@gmail.com',
                password: process.env.PASSWORD,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }

        })
        let info = await transporter.sendMail({
            from: "22222guptakrishna@gmail.com", // sender address
            to: req.body.email, // list of receivers
            subject: "Your Healthy Weight results: ", // Subject line
            text: "Your height is " + req.body.height + "cm, and your healthy weight results are" + req.body.healthyWeight + "kg. Thanks for using exercisopedia in your fitness journey." // plain text body

        });
        return res.status(200).json({ message: "Results are forwarded to your Email ID" });

    } catch (err) {
        res.status(500).json({ message: "Unable to register" });
    }
})




module.exports = router;