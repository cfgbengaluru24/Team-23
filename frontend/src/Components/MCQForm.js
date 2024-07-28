import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import "./MCQForm.css";

const MCQForm = () => {
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [score, setScore] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get("http://localhost:5001/api/quiz", {
					headers: { "x-auth-token": token },
				});
				setQuestions(response.data);
			} catch (err) {
				console.error("Error fetching questions:", err);
			}
		};

		fetchQuestions();
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev === 0) {
					clearInterval(timer);
					handleSubmit();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
	};

	const handleSubmit = async (e) => {
		if (e) e.preventDefault();

		try {
			const token = localStorage.getItem("token");
			const formattedAnswers = questions.map((question, index) => ({
				questionId: question._id,
				selectedOption: answers[`q${index}`] || "",
			}));

			const response = await axios.post(
				"http://localhost:5001/api/quiz/submit",
				{ answers: formattedAnswers },
				{ headers: { "x-auth-token": token } }
			);

			setScore(response.data.score);
			setQuizCompleted(true);
		} catch (err) {
			console.error("Error submitting quiz answers:", err);
		}
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	if (quizCompleted) {
		return (
			<div className='mcq-form-container'>
				<h2>Quiz Completed</h2>
				<h2>Your Score:</h2>
				<div style={{ width: "150px", height: "150px", margin: "auto" }}>
					<CircularProgressbar
						value={score}
						text={`${score.toFixed(2)}%`}
						styles={buildStyles({
							strokeLinecap: "round",
							textSize: "16px",
							pathColor: "#00aaff",
							textColor: "#00aaff",
							trailColor: "#d9d9d9",
						})}
					/>
				</div>
				<button onClick={() => navigate("/results")} className='btn-primary'>
					View Results
				</button>
			</div>
		);
	}

	return (
		<div className='mcq-form-container'>
			<h1>MCQ Assessment</h1>
			<div className='timer'>
				Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
				{timeLeft % 60}
			</div>
			{questions.length > 0 && (
				<form onSubmit={handleSubmit}>
					<div className='question-container'>
						<h3>{questions[currentQuestionIndex].questionText}</h3>
						{questions[currentQuestionIndex].options.map((option, i) => (
							<div key={i} style={{ textAlign: "left" }}>
								<input
									type='radio'
									id={`q${currentQuestionIndex}o${i}`}
									name={`q${currentQuestionIndex}`}
									value={option}
									checked={answers[`q${currentQuestionIndex}`] === option}
									onChange={handleChange}
								/>
								<label htmlFor={`q${currentQuestionIndex}o${i}`}>
									{option}
								</label>
							</div>
						))}
					</div>
					<div className='navigation-buttons'>
						{currentQuestionIndex > 0 && (
							<button
								type='button'
								onClick={handlePreviousQuestion}
								className='btn-secondary'
							>
								Previous
							</button>
						)}
						{currentQuestionIndex < questions.length - 1 && (
							<button
								type='button'
								onClick={handleNextQuestion}
								className='btn-primary'
							>
								Next
							</button>
						)}
						{currentQuestionIndex === questions.length - 1 && (
							<button type='submit' className='btn-primary'>
								Submit
							</button>
						)}
					</div>
				</form>
			)}
			<div>
				Current Score: {Object.keys(answers).length} / {questions.length}
			</div>
		</div>
	);
};

export default MCQForm;
