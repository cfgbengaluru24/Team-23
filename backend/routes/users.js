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

// PUT update user data
router.put('/users/:id', async (req, res) => {
    try {
        const { current_income, expenditure, savings, loan } = req.body;
        console.log(`Updating user ${req.params.id} with data:`, req.body);
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    current_income: { $each: [current_income], $slice: -5 },
                    expenditure: { $each: [expenditure], $slice: -5 },
                    savings: { $each: [savings], $slice: -5 },
                    loan: { $each: [loan], $slice: -5 }
                }
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
