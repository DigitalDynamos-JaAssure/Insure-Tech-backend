const router = require('express').Router();
const { createCanvas, loadImage } = require('canvas');
const axios = require("axios");
const fs = require("fs");
const Policy = require('../models/Policies.model');
const User = require('../models/User.model');
const Claim = require('../models/claim.model');
router.route('/getClaimsReq').get((req, res) => {
   Claim.find({status:"Pending"})
   .then(claims=>{
       res.json(claims);
   })
   .catch(err=>{
       res.json(err);
   })
})



const image = fs.readFileSync("./patches_9.jpg", {
    encoding: "base64"
});



router.route('/claimAdd/:id/:policyId').post((req, res) => {
    const {id,policyId}=req.params;
   const {object}=req.body;
    const newClaim = new Claim({
        policyId,
        userId:id,
        object,
       
    });
    newClaim.save()
        .then((result) => {
           const user=User.findById(id);            
            user.claims.push(result._id);
            user.save().then(()=>{
                res.json({message:'Claim added!',claimId:newlaim._id})})
            })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/acceptClaim/:id').post((req,res)=>{
    const {id}=req.params;
    Claim.findById(id).then(claim=>{
        claim.status='accepted';
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
    Claim.find({_id:id,status:'accepted'}).then(claim=>{
        res.status(200).json(claim.agent)
    })
})

    

module.exports = router;