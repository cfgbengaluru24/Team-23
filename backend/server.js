require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const exotelRoutes = require("./routes/exotel"); // Import the Exotel routes

const app = express();

// Middleware
app.use(cors()); // Use the cors middleware to allow cross-origin requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Use the auth routes with prefix /api/auth
app.use("/api/quiz", quizRoutes); // Use the quiz routes with prefix /api/quiz
app.use("/api/exotel", exotelRoutes); // Use the exotel routes with prefix /api/exotel

const PORT = process.env.PORT || 5001;

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected");
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err.message);
	});
