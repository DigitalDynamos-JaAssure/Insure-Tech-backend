const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PolicySchema = new Schema(
    {
      "riskFactor":{type:Number},
    
        "policyNumber": String,
        "policyType": {type:String, enum:["Car","Pipe"]},
        "startDate": {type:Date, default:Date.now()},
        "endDate": {type:Date,default:Date.now()},
        "carDetails": {
          "carImg":String,
          "Engine_No": String,
          "color":String,
          "model": String,
          "year": String,
          "chesis_no":String,
          "coverage": {type:[String], enum:["Crash","Dent","Headlight","Windshield","Scratches","Tyre","Oil Change"]},
        },
        "pipeDetails":{

        },
        "user":{type:mongoose.Schema.Types.ObjectId, ref:'User'},        
        "status":{type:String, enum:["Pending","Approved","Rejected","Booked"],default:"Booked"},
        "premium": {
          "amount": Number,
          "dueDate": Date,
          "paymentStatus": String
        }
    }
);
const Policy= mongoose.model('Policy', PolicySchema);
module.exports = Policy;
