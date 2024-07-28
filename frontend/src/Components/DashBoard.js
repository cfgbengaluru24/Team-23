import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer"; // Assuming VideoPlayer is in the same directory
import { FaTimes } from "react-icons/fa"; // Correct import for the cross icon

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [modNum, setModNum] = useState(null);

	useEffect(() => {
		setModNum(1);
	}, []);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleModuleClick = (moduleId) => {
		setModNum(moduleId);
		console.log(modNum);
	};

	const Logout = () => {
		localStorage.removeItem("token");
		window.location.replace("/");
	};

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				overflow: "hidden",
				background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Enhanced gradient background
				color: "#fff",
			}}
		>
			<div
				style={{
					width: isSidebarOpen ? "250px" : "50px",
					transition: "width 0.3s",
					background: "linear-gradient(135deg, #343a40, #495057)",
					color: "#fff",
					overflowX: "hidden",
					padding: isSidebarOpen ? "10px" : "10px 0",
					boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
					display: "flex",
					flexDirection: "column",
					alignItems: isSidebarOpen ? "flex-start" : "center",
					height: "100vh", // Ensure the sidebar takes the full height of the viewport
					position: "sticky", // Make the sidebar sticky
					top: 0, // Stick to the top
				}}
			>
				<button
					onClick={toggleSidebar}
					style={{
						backgroundColor: "transparent",
						color: "#fff",
						border: "none",
						cursor: "pointer",
						marginBottom: "10px",
						alignSelf: isSidebarOpen ? "flex-end" : "center",
					}}
				>
					{isSidebarOpen ? <FaTimes size={20} /> : "⋮"}
				</button>
				{isSidebarOpen && (
					<div style={{ textAlign: "center", width: "100%", flex: 1 }}>
						<div style={{ fontSize: "20px", color: "white" }}>
							Region : Karnataka
						</div>
						<div
							className='mt-5'
							onClick={() => handleModuleClick(1)}
							style={{
								marginBottom: "10px",
								fontSize: "18px",
								cursor: "pointer",
							}}
						>
							Module 1
						</div>
						<div
							onClick={() => handleModuleClick(2)}
							style={{
								marginBottom: "10px",
								fontSize: "18px",
								cursor: "pointer",
							}}
						>
							Module 2
						</div>
						<div
							onClick={() => handleModuleClick(3)}
							style={{
								marginBottom: "10px",
								fontSize: "18px",
								cursor: "pointer",
							}}
						>
							Module 3
						</div>
						<div
							onClick={() => handleModuleClick(4)}
							style={{
								marginBottom: "10px",
								fontSize: "18px",
								cursor: "pointer",
							}}
						>
							Module 4
						</div>
						<div
							className='mt-5'
							style={{
								marginBottom: "10px",
								fontSize: "18px",
								cursor: "pointer",
							}}
							onClick={() => window.location.replace("/quiz")}
						>
							Go to Assessment
						</div>
					</div>
				)}
				{isSidebarOpen && (
					<div
						style={{
							marginTop: "auto",
							width: "100%",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<button type='button' className='btn btn-danger' onClick={Logout}>
							Sign Out
						</button>
					</div>
				)}
			</div>
			<div style={{ flex: 1, padding: "15px", overflowY: "auto" }}>
				<VideoPlayer modNum={modNum} region='karnataka' />
			</div>
		</div>
	);
};

export default App;
