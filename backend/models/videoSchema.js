const mongoose = require('mongoose')
const videoSchema = new mongoose.Schema(
    {
        videoID : {type:String},
        videoUrl : {type:String}, 
        videoThumbnail : {type:String}, 
        videoCaption : {type:String},
        videoModule : {type:String},
        videoRegion : { type: String },
        
    },
    {
        collection:"Videos"
    }
)

module.exports = mongoose.model("videoSchema",videoSchema)