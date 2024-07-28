import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Instructions from "./Instructions";
import Question from "./Question";
import "./Quiz.css";

// Axios instance for authenticated requests
const axiosInstance = axios.create({
	baseURL: "http://localhost:5001/api",
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token"); // Fetch the token from local storage
		if (token) {
			config.headers["x-auth-token"] = token; // Attaching the token to the headers
		}
		return config;
	},
	(error) => Promise.reject(error)
);

const Quiz = () => {
	const [started, setStarted] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [score, setScore] = useState(null);
	const [timeLeft, setTimeLeft] = useState(600);
	const [error, setError] = useState("");
	const [quizCompleted, setQuizCompleted] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (started) {
			fetchQuestions();
			const timer = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev === 0) {
						clearInterval(timer);
						endQuiz();
						return 0;
					}
					return prev - 1;
				});
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [started]);

	const fetchQuestions = async () => {
		try {
			const response = await axiosInstance.get("/quiz");
			setQuestions(response.data);
		} catch (error) {
			console.error("Error fetching quiz questions:", error);
			setError("Failed to load questions. Please try again.");
		}
	};

	const startQuiz = () => {
		setStarted(true);
		setError("");
	};

	const handleSelect = (questionIndex, selectedOption) => {
		setSelectedAnswers((prev) => ({
			...prev,
			[questionIndex]: selectedOption,
		}));
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			submitQuiz();
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const submitQuiz = async () => {
		try {
			const formattedAnswers = questions.map((question, index) => ({
				questionId: question._id,
				selectedOption: selectedAnswers[index] || "",
			}));

			const response = await axiosInstance.post("/quiz/submit", {
				answers: formattedAnswers,
			});
			setScore(response.data.score);
			setQuizCompleted(true);
		} catch (error) {
			console.error("Error submitting quiz:", error);
			setError("Failed to submit quiz. Please try again.");
		}
	};

	const endQuiz = () => {
		setStarted(false);
		submitQuiz();
	};

	if (error) {
		return (
			<div className='quiz-container'>
				<h2>Error</h2>
				<p>{error}</p>
				<button onClick={() => navigate("/login")} className='btn-primary'>
					Back to Login
				</button>
			</div>
		);
	}

	if (quizCompleted) {
		return (
			<div className='quiz-container'>
				<h1>Quiz Completed</h1>
				<p>
					Your score:{" "}
					{score === null ? 0 : ((score / questions.length) * 100).toFixed(2)}%
				</p>
				<button onClick={() => navigate("/quiz")} className='btn-primary'>
					Take Again
				</button>
			</div>
		);
	}

	return (
		<div className='quiz-container'>
			{!started ? (
				<Instructions onStart={startQuiz} />
			) : (
				<>
					<div className='quiz-header'>
						<div className='timer'>
							Time Left: {Math.floor(timeLeft / 60)}:
							{timeLeft % 60 < 10 ? "0" : ""}
							{timeLeft % 60}
						</div>
					</div>
					{currentQuestionIndex < questions.length && (
						<>
							<Question
								question={questions[currentQuestionIndex].questionText}
								options={questions[currentQuestionIndex].options}
								onSelect={(selectedOption) =>
									handleSelect(currentQuestionIndex, selectedOption)
								}
								questionNumber={currentQuestionIndex + 1}
								selectedOption={selectedAnswers[currentQuestionIndex] || ""}
							/>
							<div className='navigation-buttons'>
								{currentQuestionIndex > 0 && (
									<button
										onClick={handlePreviousQuestion}
										className='btn-secondary'
									>
										Previous
									</button>
								)}
								<button onClick={handleNextQuestion} className='btn-primary'>
									{currentQuestionIndex === questions.length - 1
										? "Submit"
										: "Next"}
								</button>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Quiz;
