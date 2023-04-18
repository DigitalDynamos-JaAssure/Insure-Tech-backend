const router = require('express').Router();
const Policy = require('../models/Policies.model');
const User = require('../models/User.model');
const Claim = require('../models/claim.model');


router.route('/getClaimsReq').get((req, res) => {
   Claim.find({status:"pending"})
   .then(claims=>{
       res.json(claims);
   })
   .catch(err=>{
       res.json(err);
   })
})
router.route('/getClaimsAproved').get((req, res) => {
   Claim.find({status:"approved"})
   .then(claims=>{
       res.json(claims);
   })
   .catch(err=>{
       res.json(err);
   })
})


router.route('/claimAdd/:id/:policyId').post((req, res) => {
    const {id,policyId}=req.params;
   const {object}=req.body;
    const newClaim = new Claim({
        policyId,
        userId:id,
        object,
       
    });
    newClaim.save()
        .then(async (result) => {
           await User.findById(id).then((user)=>{
            console.log(user)
               let claimId=[];
               claimId.push(result._id);            
                user.insuranceHistory.claimIds=claimId;
                user.save().then(()=>{
                    res.json({message:'Claim added!',claimId:newClaim._id})})
                })
           })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/acceptClaim/:id').post((req,res)=>{
    const {id}=req.params;
    Claim.findById(id).then(claim=>{
        claim.status='approved';
        claim.agent=req.body.agent;
        claim.save().then(()=>{
            res.json('Claim accepted!')
        })
    })
})

router.route('/rejectClaim/:id').post((req,res)=>{
    const {id}=req.params;
    Claim.findById(id).then(claim=>{
        claim.status='rejected';
        claim.save().then(()=>{
            res.json('Claim rejected!')
        })
    })
})
router.route('/getAcceptedClaim/:id').get((req,res)=>{
    const {id}=req.params;
    Claim.findById(id).then(claim=>{
        if(claim.status=='approved'){
            res.status(200).json(claim.agent)
        }
        else{
            res.json({message:'No accepted claim'})
        }
        
    }).catch(err=>{
        
        res.status(400).json(err)
    })
    
})

    

module.exports = router;