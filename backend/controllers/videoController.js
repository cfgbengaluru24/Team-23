const asyncHandler = require("express-async-handler");

const videoSchema = require('../models/videoSchema')


const addVideo = asyncHandler(async(req,res)=>
    {
        try 
        {
            const {videoID,videoUrl,videoThumbnail,videoCaption,videoModule,videoRegion } = req.body;
            const video = new videoSchema({videoID,videoUrl,videoThumbnail,videoCaption,videoModule,videoRegion });
            await video.save();
            res.status(200).json({ message: 'Video uploaded'})
            
        } 
        catch (error) {
            console.error('Error in uploading :', error);
            res.status(500).json({ message: 'Error in uploading' });
        }
    
    });

const getVideos = async (req, res) => {
    try 
    {
        const foundVideos = await videoSchema.find();
        if (foundVideos.length > 0) 
        {

            res.status(200).json(foundVideos);
        } 
        else 
        {
            //console.log('No collections found for userID:', targetUserID);
            res.status(404).json({ message: 'No Videos found' });
        }
    } catch (error) 
    {
        console.error('Error fetching collections:', error);
        
        res.status(500).json({ message: 'Error fetching collections' });
    } 
};

const getRegional = async (req, res) => {
    try {
        const targetRegion = req.body.videoRegion;
        const module = req.body.videoModule;
        console.log(module);
        const foundVideos = await videoSchema.find({ videoRegion: targetRegion, videoModule : module });

        if (foundVideos.length > 0) {
            res.status(200).json(foundVideos );
        } else {
            res.status(404).json({ message: 'No Videos found for the specified region' });
        }
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ message: 'Error fetching regional collections' });
    }
};

const watchVideo = async(req,res)=>{
    try {
        const currentID = req.body.ID;
        const currentVideo = await videoSchema.findOne({ _id: currentID});

        if (!currentVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const isWatched =currentVideo.videoStatus; 
        
            await postModel.findOneAndUpdate(
                { _id: currentID },
                {  videoStatus: true }
            );
        

        const updatedVideo = await videoSchema.findOne({ _id: currentID });
        return res.status(200).json({ updatedVideo});
    } catch(error){
        res.status(500).json({message:"Error occured, try again"});
    }
}


const delVideo = async(req,res)=>{
    try{
        const videoId = req.body.ID; 
        const deletedVideo = await videoSchema.findByIdAndDelete(videoId);

        if (deletedVideo) {
            res.status(200).json({ message: 'Video deleted successfully', deletedVideo });
        } else {
            res.status(404).json({ message: 'Video not found' });
        }

    }catch(error)
    {
        console.error('Error in deleting:', error);
        res.status(500).json({ message: 'Error deleting' });
    }
}


module.exports={getVideos,getRegional,addVideo,watchVideo,delVideo}