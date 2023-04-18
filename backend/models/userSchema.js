const  mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({    //userSchema is an instance of mongoose

first_name:{
    type:String,
    required:true
},
last_name:{
    type:String,
    required:false
},
email:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true,
  
},
password:{
    type:String,
    required:true,
   
},
tokens:[
    {
   token:{
    type:String,
    required:true,
   }
    }
]

})


//encrypting the password

userSchema.pre('save', async function(next){     // here we have written save because we want this function to run before save
                          //since we are using this keyword so rather than using arrow function we will use normal function. Also it will return a promise so we are using async
      if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password,12);              //this.password is the password we are getting from user
     
    }
      next();   // will call the save method automatically

   })

   //we are generating auth token
   userSchema.methods.generateAuthToken = async function(){
    try{
     let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);   // here we are getting the id present in mongo database.
   this.tokens=this.tokens.concat({token:token})
  await this.save();
  return token;
    }catch(err){
   console.log(err);
    }

   }

   const User = mongoose.model('USER',userSchema);
module.exports=User;
