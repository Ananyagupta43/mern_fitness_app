const jwt = require('jsonwebtoken')
const User = require('../models/userSchema');


const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);// here we are comparing secret key with jwt token
        const rootUser = await User.findOne({ _id: verifyToken._id, 'tokens.token': token });  // if they matches then e can access the entire user data 

        if (!rootUser) {
            throw new Error('User not found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id
        next();
    } catch (err) {
        res.status(401).send('Unauthorized:No token provided');
    }

}

module.exports = authenticate