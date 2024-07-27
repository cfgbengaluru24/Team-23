// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id:{type:Object},
    name: {type:String},
    occupation: {type:String},
    current_income: {type:Number},
    expenditure: {type:Number},
    savings: {type:Number},
    loan: {type:Number},
    interest: {type:String}
},{collections:"users"});

module.exports = mongoose.model('User', UserSchema);
