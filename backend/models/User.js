// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    occupation: { type: String },
    current_income: [{ type: Number }],
    expenditure: [{ type: Number }],
    savings: [{ type: Number }],
    loan: [{ type: Number }],
    phone_number: { type: String }
}, { collection: "users" });

module.exports = mongoose.model('User', UserSchema);
