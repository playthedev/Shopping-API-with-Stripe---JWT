const router=require('express').Router();
const User=require("../models/user")
const cryptojs=require('crypto-js');
const jwt=require('jsonwebtoken');
//sign in 
router.post('/register',async(req,res)=>{
    const newUser=new User(
        {
            username:req.body.username,
            email:req.body.email,
            password:cryptojs.AES.encrypt(req.body.password, 'arish123').toString()
        }
    );
    try{
        // console.log(newUser.password)
        const savedUser=await newUser.save()
        res.status(201).json(savedUser);
    }catch(err){
        console.log(err)
    }
})


//login
router.post('/login',async(req,res)=>{
    try{
      const user=await User.findOne({username:req.body.username});
    //   console.log(user);
      if(!user) console.log('wrong credentials')
      
    //   console.log(user.password);
      const hashedpass=cryptojs.AES.decrypt(user.password,'arish123')
    //   console.log(hashedpass);
      const pass=hashedpass.toString(cryptojs.enc.Utf8);
    //   console.log(pass);
      if(pass!==req.body.password){
        // console.log('pass not equal')
       res.status(401).json('wrong credentials!');}
       
       const accessToken=jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin,
       },
       "arish123",
       {expiresIn:'3d'}
       )

       const {password,...others}=user._doc;
       console.log(accessToken)
       res.status(200).json(others)
    }
    catch(err){
        console.log(err)
    }
})

module.exports=router; 