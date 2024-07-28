const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const dotenv = require("dotenv");
const FormData = require("form-data");

dotenv.config();

// Exotel API credentials
const SUBDOMAIN = process.env.SUBDOMAIN;
const EXOTEL_SID = process.env.EXOTEL_SID;
const EXOTEL_API_KEY = process.env.EXOTEL_API_KEY;
const EXOTEL_API_TOKEN = process.env.EXOTEL_API_TOKEN;
// Base URL for Exotel API
const BASE_URL = `https://${SUBDOMAIN}/v1/Accounts/${EXOTEL_SID}`;

// Function to fetch calls
async function fetchCalls() {
	try {
		const auth = {
			username: EXOTEL_API_KEY,
			password: EXOTEL_API_TOKEN,
		};

		const headers = {
			"Content-Type": "application/json",
		};
		const url = `${BASE_URL}/Calls`;

		const response = await axios.get(url, { auth, headers });
		return response.data;
	} catch (error) {
		console.error("Error fetching calls:", error.message);
		return null;
	}
}

// Function to download a recording
async function downloadRecording(recordingUrl, fileName) {
	try {
		console.log(`Downloading recording from ${recordingUrl}...`);

		const response = await axios({
			method: "get",
			url: recordingUrl,
			responseType: "stream",
		});

		const filePath = path.join("recordings", fileName);

		// Create a write stream to save the recording
		const writer = fs.createWriteStream(filePath);

		// Pipe the response data to the file
		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on("finish", () => {
				console.log(`Successfully downloaded ${fileName}`);
				resolve();
			});
			writer.on("error", (err) => {
				console.error(`Error writing file ${fileName}:`, err);
				reject(err);
			});
		});
	} catch (error) {
		console.error("Error downloading recording:", error.message);
		throw error;
	}
}

// Function to get the most recent MP3 file from the directory
const getMostRecentMp3 = (dir) => {
	const files = fs
		.readdirSync(dir)
		.filter((file) => file.endsWith(".mp3"))
		.map((file) => ({
			file,
			time: fs.statSync(path.join(dir, file)).mtime.getTime(),
		}))
		.sort((a, b) => b.time - a.time);

	return files.length > 0 ? files[0].file : null;
};

// Function to transcribe an audio file using OpenAI's API
async function transcribe(filePath) {
	const formData = new FormData();
	formData.append("file", fs.createReadStream(filePath));
	formData.append("model", "whisper-1");

	try {
		const response = await axios.post(
			"https://api.openai.com/v1/audio/transcriptions",
			formData,
			{
				headers: {
					...formData.getHeaders(),
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				},
			}
		);

		return response.data.text;
	} catch (error) {
		console.error("Error during transcription:", error.message);
		if (error.response) {
			console.error("API response:", error.response.data);
		}
		throw error;
	}
}

// Route to fetch calls and download the latest recording
router.get("/fetch-calls", async (req, res) => {
	try {
		const xmlData = await fetchCalls();
		if (!xmlData) {
			return res.status(500).json({ msg: "Failed to fetch calls data." });
		}

		const parser = new xml2js.Parser();
		const jsonData = await parser.parseStringPromise(xmlData);

		const calls = jsonData.TwilioResponse.Call;
		if (!calls || calls.length === 0) {
			return res.status(404).json({ msg: "No calls found in the response." });
		}

		const callWithRecording = calls
			.filter((call) => call.RecordingUrl && call.RecordingUrl[0] !== "")
			.sort(
				(a, b) => new Date(b.DateCreated[0]) - new Date(a.DateCreated[0])
			)[0];

		if (callWithRecording) {
			const recordingUrl = callWithRecording.RecordingUrl[0];
			const callSid = callWithRecording.Sid[0];
			const dateCreated = callWithRecording.DateCreated[0];
			const fileName = `${dateCreated.replace(/[:-]/g, "")}_${callSid}.mp3`;

			console.log(
				`Downloading most recent recording for call ${callSid} (${dateCreated})...`
			);
			await downloadRecording(recordingUrl, fileName);
			return res.json({ msg: `Successfully downloaded ${fileName}` });
		} else {
			return res
				.status(404)
				.json({ msg: "No recordings found in the recent calls." });
		}
	} catch (error) {
		console.error("Error processing calls:", error.message);
		return res.status(500).json({ msg: "Server error" });
	}
});

// Route to transcribe the most recent MP3 file
router.get("/transcribe-latest", async (req, res) => {
	try {
		const dir = path.join(__dirname, "../recordings");
		const mostRecentFile = getMostRecentMp3(dir);

		if (!mostRecentFile) {
			return res
				.status(404)
				.json({ msg: "No MP3 files found in the recordings directory." });
		}

		const filePath = path.join(dir, mostRecentFile);

		console.log(`Transcribing: ${mostRecentFile}`);
		const transcript = await transcribe(filePath);

		const transcriptPath = path.join(
			dir,
			path.basename(mostRecentFile, ".mp3") + ".txt"
		);
		fs.writeFileSync(transcriptPath, transcript);

		return res.json({
			msg: `Transcription saved: ${transcriptPath}`,
			transcript,
		});
	} catch (error) {
		console.error("Error during transcription process:", error.message);
		return res.status(500).json({ msg: "Server error" });
	}
});

module.exports = router;
