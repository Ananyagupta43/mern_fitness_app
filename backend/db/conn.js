const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log("connection done");  //will connect app to atlas db
}).catch((err) => {
    // console.log(err);
})  