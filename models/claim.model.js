const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClaimSchema = new Schema(
    {
        "policyId": {type:mongoose.Schema.Types.ObjectId, ref:'Policy'},
        "userId":{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        "object": {
          "damages":[{
            "crash%":{type:Number,default:0},
            "headlights%":{type:Number,default:0},
            "scratches%":{type:Number,default:0},
        }],
          "img":{type:[String]}
        },
        "claimDate": {type:Date,default:Date.now()},
        "status": {type:String,enum:["pending","approved","rejected"],default:"pending"},
        "agent":{
            "name":{type:String},
            "email":{type:String},
            "phone":{type:String}
        }

       
    }
);
const Claim = mongoose.model('Claim', ClaimSchema);
module.exports = Claim;
