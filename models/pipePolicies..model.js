const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pipePolicySchema = new Schema(
    {
        "policyNumber": String,
        "startDate": Date,
        "endDate": Date,
        "car": {
          "make": String,
          "model": String,
          "year": Number,
          "licensePlate": String,
          "currentMileage": Number,
          "usage": String,
          "garagingAddress": String
        },
        "user":{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        "coverage": {type:[String],enum:['Windshield','Dent','HeadLights','Tires','Crash','body']},
        "premium": {
          "amount": Number,
          "dueDate": Date,
          "paymentStatus": String
        }
    }
);
const Pipe = mongoose.model('PipePolicy', pipePolicySchema);
module.exports = Pipe;
