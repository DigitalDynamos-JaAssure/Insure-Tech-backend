const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
      "insuranceHistory": {
        "claimIds": [{type: mongoose.Schema.Types.ObjectId, ref:'Claim'}],
        "coverage": {type:String},
        "losses": [{
            "loss_date":{type:Date},
            "loss_amount":{type:Number},
            "loss_cause":{type:String},
      }],
      "policies":[{type:mongoose.Schema.Type.ObjectId, ref:'Policy'}]
      },
      "name": {type:String, required:true},
      "email": {type:String, required:true},
      "phone": {type:String, required:true}

    
});
const User = mongoose.model('User', userSchema);
module.exports = User;
