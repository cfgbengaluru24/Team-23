const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Assessment = require("../models/Assessment");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Fetch random questions for the quiz
router.get("/", auth, async (req, res) => {
	try {
		const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
		res.json(questions);
	} catch (err) {
		console.error("Error fetching questions:", err.message);
		res.status(500).json({ msg: "Server error" });
	}
});

// Submit quiz answers and calculate the score
router.post("/submit", auth, async (req, res) => {
	const { answers } = req.body;
	const userId = req.user.id;

	try {
		let score = 0;
		const totalQuestions = answers.length;

		for (let answer of answers) {
			const question = await Question.findById(answer.questionId);
			if (question && question.correctAnswer === answer.selectedOption) {
				score += 1;
			}
		}

		const percentage = (score / totalQuestions) * 100;
		const passed = percentage >= 70;

		const assessment = new Assessment({
			user: userId,
			score: percentage,
			passed,
		});
		await assessment.save();

		await User.findByIdAndUpdate(userId, { $set: { score: percentage } });

		res.json({ score: percentage, passed });
	} catch (err) {
		console.error("Error submitting quiz answers:", err.message);
		res.status(500).json({ msg: "Server error" });
	}
});

// Fetch quiz results for the authenticated user
router.get("/results", auth, async (req, res) => {
	try {
		const assessments = await Assessment.find({ user: req.user.id }).sort({
			createdAt: -1,
		});
		res.json(assessments);
	} catch (err) {
		console.error("Error fetching quiz results:", err.message);
		res.status(500).json({ msg: "Server error" });
	}
});

module.exports = router;
