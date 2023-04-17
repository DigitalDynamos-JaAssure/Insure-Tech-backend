const router = require('express').Router();
const User = require('../models/User');

router.route('/signup').post(async (req,res)=>{
    const {name,email,phone}=req.body;
    const User = new User({
        name,
        email,
        phone
    }); 
    await User.save().then((res)=>{
        res.status(200).json({message:"user added",user:User,user_id:User._id})
    })
});

router.route('/login').post(async (req,res)=>{
    const {email}=req.body;
    await User.findOne({email:email}).then((user)=>{
        if(user){
            res.status(200).json({message:"user found",user:user})
        }
        else{
            res.status(400).json({message:"user not found"})
        }
    })
})

