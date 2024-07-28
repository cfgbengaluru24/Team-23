import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginRegisterForm.css";

const backgroundStyle = {
	backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/ngo.png"})`,
	backgroundSize: "cover",
	backgroundPosition: "center",
	height: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

const statesOfIndia = [
	"Andhra Pradesh",
	"Arunachal Pradesh",
	// ... (other states)
	"West Bengal",
];

const LoginRegisterForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		region: "",
		profession: "",
		ngoWork: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const switchForm = () => {
		setIsLogin(!isLogin);
		setError("");
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validateForm = () => {
		if (isLogin) {
			if (!formData.email || !formData.password) {
				setError("Please fill in all fields.");
				return false;
			}
		} else {
			if (
				!formData.name ||
				!formData.email ||
				!formData.password ||
				!formData.region ||
				!formData.profession ||
				!formData.ngoWork
			) {
				setError("Please fill in all fields.");
				return false;
			}
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!validateForm()) {
			return;
		}

		try {
			if (isLogin) {
				const response = await axios.post(
					"http://localhost:5001/api/auth/login",
					{
						email: formData.email,
						password: formData.password,
					}
				);
				localStorage.setItem("token", response.data.token);
				navigate("/dashboard");
			} else {
				await axios.post("http://localhost:5001/api/auth/signup", formData);
				switchForm();
			}
		} catch (error) {
			setError(
				error.response?.data?.msg || "An error occurred. Please try again."
			);
		}
	};

	return (
		<div style={backgroundStyle}>
			<div className='wrapper'>
				<div className='container'>
					<h1 className='brand'>Welcome!</h1>
					{error && <div className='error-message'>{error}</div>}
					{isLogin ? (
						<form className='form' onSubmit={handleSubmit}>
							<h2>Login</h2>
							<div className='form-group'>
								<label htmlFor='loginEmail'>Email Address</label>
								<input
									type='email'
									id='loginEmail'
									name='email'
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='loginPassword'>Password</label>
								<input
									type='password'
									id='loginPassword'
									name='password'
									value={formData.password}
									onChange={handleChange}
									required
								/>
							</div>
							<button type='submit' className='btn-primary'>
								Sign In
							</button>
							<p>
								Don't have an account?{" "}
								<button
									type='button'
									className='link-button'
									onClick={switchForm}
								>
									Register
								</button>
							</p>
						</form>
					) : (
						<form className='form' onSubmit={handleSubmit}>
							<h2>Register</h2>
							{/* Registration form fields */}
							{/* ... (include all registration fields as before) */}
							<button type='submit' className='btn-primary'>
								Register
							</button>
							<p>
								Already have an account?{" "}
								<button
									type='button'
									className='link-button'
									onClick={switchForm}
								>
									Login
								</button>
							</p>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterForm;
