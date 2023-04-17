const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carPolicySchema = new Schema(
    {
        "policyNumber": String,
        "startDate": Date,
        "endDate": Date,
        "car": {
          "make": String,
          "model": String,
          "year": Number,
          "vin": String,
          "licensePlate": String,
          "currentMileage": Number,
          "usage": String,
          "garagingAddress": String
        },
        "user":{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        "coverage": {type:[String], enum:["Crash","Dent","Headlight","Windshield","Scratches","Oil Change"]},
        "premium": {
          "amount": Number,
          "dueDate": Date,
          "paymentStatus": String
        }
    }
);
const Car= mongoose.model('CarPolicy', carPolicySchema);
module.exports = Car;
