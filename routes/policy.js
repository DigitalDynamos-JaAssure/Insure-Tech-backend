const router = require('express').Router();
const Policy = require('../models/Policies.model');
const User = require('../models/User.model');
router.route('/newPolicy/:id').post(async(req,res)=>{
    const{carDetails,coverage,policyType,riskFactor}=req.body;
    let policyNumber=""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 10;

    let prem_amt=0;
    if(riskFactor<0.5){
        prem_amt=100000;
    }
    else if(riskFactor>0.8){
        prem_amt=50000;
    }
    else{
        prem_amt=75000;
    }
    const premium={
        amount:prem_amt,
    }
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      policyNumber += characters[randomIndex];
    }
    const user=await User.findById(req.params.id)

    const newPolicy = new Policy({
        carDetails,coverage,premium,policyType,policyNumber,user:req.params.id
    });
    newPolicy.save().then((result)=>{
        user.insuranceHistory.claimIds.push(result._id);
        user.save();        
        res.status(200).json({message:"Policy created successfully",result:result});
    }).catch((err)=>{
        res.status(500).json({message:"Policy creation failed",err:err});
    }       
)}
)
router.route('/getAllPolicies/:id').get(async(req,res)=>{
    const policies=await Policy.find({user:req.params.id});
    res.status(200).json({message:"Policies fetched successfully",policies:policies});
})

router.route('/getPolicy/:id').get(async(req,res)=>{
    const policy=await Policy.findById(req.params.id);
    res.status(200).json({message:"Policy fetched successfully",policy:policy});
})

module.exports = router;