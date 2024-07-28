import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegisterForm from "./Components/LoginRegisterForm";
import BlankPage from "./Components/BlankPage";
import Instructions from "./Components/Instructions";
import MCQForm from "./Components/MCQForm";
import QuizResults from "./Components/QuizResults"; // Add import for QuizResults component
import DashBoard from "./Components/DashBoard";

function App() {
	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route path='/' element={<LoginRegisterForm />} />
					<Route path='/blankpage' element={<BlankPage />} />
					<Route path='/instructions' element={<Instructions />} />
					<Route path='/quiz' element={<MCQForm />} />
					<Route path='/results' element={<QuizResults />} />{" "}
					{/* Add route for QuizResults */}
					<Route path='*' element={<h1>Not Found</h1>} />
					<Route path='/dashboard' element={<DashBoard />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
