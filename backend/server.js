require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Verify environment variables
console.log('Twilio Account SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('Twilio Auth Token:', process.env.TWILIO_AUTH_TOKEN);
console.log('Twilio Phone Number:', process.env.TWILIO_PHONE_NUMBER);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));

app.get('/', (req,res)=>{
    res.send("api running");
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
