const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup route
router.post("/signup", async (req, res) => {
	try {
		const { name, email, password, region, profession } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		user = new User({
			name,
			email,
			password: hashedPassword,
			region,
			profession,
		});
		await user.save();
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server error" });
	}
});

// Login route
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server error" });
	}
});

module.exports = router;
