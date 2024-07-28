const express = require('express');

const { getVideos, getRegional, addVideo, watchVideo, delVideo } = require('../controllers/videoController');

const router = express.Router();

router.post("/",getVideos);
router.post("/region",getRegional);
router.post("/add",addVideo);
router.post("/watch",watchVideo);
router.post('/del',delVideo)

module.exports = router;