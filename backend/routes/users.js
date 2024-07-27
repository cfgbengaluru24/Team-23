const express = require('express');
const router = express.Router();
const User = require('../models/User');
const sendSMS = require('../twilio');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ collection: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new user
router.post('/post', async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET users by occupation
router.get('/occupation/:occupation', async (req, res) => {
    try {
        const users = await User.find({ occupation: req.params.occupation });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST send SMS
router.post('/send-sms', async (req, res) => {
    const { phoneNumber, message } = req.body;
    try {
        await sendSMS(phoneNumber, message);
        res.status(200).json({ message: 'SMS sent successfully!' });
    } catch (err) {
        console.error('Failed to send SMS:', err.message);
        res.status(500).json({ message: 'Failed to send SMS', error: err.message });
    }
});


module.exports = router;
