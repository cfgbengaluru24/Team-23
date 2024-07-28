import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuizResults.css";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5001/api",
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["x-auth-token"] = token;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

const QuizResults = () => {
	const [results, setResults] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchResults = async () => {
			try {
				const response = await axiosInstance.get("/quiz/results");
				setResults(response.data);
			} catch (err) {
				console.error("Error fetching quiz results:", err.message);
				setError("Failed to load quiz results. Please try again.");
			}
		};

		fetchResults();
	}, []);

	const goToQuiz = () => {
		navigate("/quiz");
	};

	if (error) {
		return (
			<div className='quiz-results'>
				<h2>Error</h2>
				<p>{error}</p>
				<button onClick={goToQuiz} className='btn-primary'>
					Retry
				</button>
			</div>
		);
	}

	return (
		<div className='quiz-results'>
			<h1>Quiz Results</h1>
			{results.length > 0 ? (
				<div className='results-table'>
					<table>
						<thead>
							<tr>
								<th>Quiz Date</th>
								<th>Score</th>
								<th>Passed</th>
							</tr>
						</thead>
						<tbody>
							{results.map((result) => (
								<tr key={result._id}>
									<td>{new Date(result.createdAt).toLocaleString()}</td>
									<td>{result.score.toFixed(2)}%</td>
									<td>{result.passed ? "Yes" : "No"}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p>No quiz results available.</p>
			)}
			<button
				onClick={() => window.location.replace("/dashboard")}
				className='btn-primary'
			>
				Go to Dashboard
			</button>
		</div>
	);
};

export default QuizResults;
