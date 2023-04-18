const router = require('express').Router();
const Policy = require('../models/Policies.model');
const User = require('../models/User.model');
const Claim = require('../models/claim.model');
router.route('/getall').get((req, res) => {
    Claim.find()
        .then(claims => res.json(claims))
        .catch(err => res.status(400).json('Error: ' + err));
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
        .then((result) => {
           const user=User.findById(id);            
            user.claims.push(result._id);
            user.save().then(()=>{
                res.json('Claim added!')})
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

module.exports = router;