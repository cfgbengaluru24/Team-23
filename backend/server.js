const express = require("express");
const connectDB = require("./config/db");
const videoRoutes = require("./routes/videoRoutes")
const mongoose = require("mongoose");
var cors = require('cors')
const app = express(); 

connectDB();

app.use(express.json());
app.use(cors()) 
app.get('/',(req,res)=>{ 
    res.send("API is runing"); 
});

app.use('/api/videos',videoRoutes)   


const server = app.listen(5000,console.log("Server started")) 