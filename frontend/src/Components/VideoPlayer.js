import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoPlayer = ({ modNum, region }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [url, setUrl] = useState();
    const [thumbUrl, setThumb] = useState();
    const [caption, setCaption] = useState();
    const [vidID, setVidID] = useState();

    const handleThumbnailClick = () => {
        setIsPlaying(true);
    };

    useEffect(() => {
        setIsPlaying(false);
        console.log("Fetching data for module:", modNum, "and region:", region);
        getPosts();
    }, [modNum, region]); // Re-fetch data when modNum or region changes

    const getPosts = async () => {
        try {
            const res = await axios.post("https://cfg-vid-backend.onrender.com/api/videos/region", {
                videoRegion: region,
                videoModule: modNum
            });
            console.log(res);
            const filteredItems = res.data[0];
            setUrl(filteredItems.videoUrl);
            setThumb(filteredItems.videoThumbnail);
            setCaption(filteredItems.videoCaption);
            setVidID(filteredItems.videoID);
            console.log("Fetched posts");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", overflow: "hidden" }}>

            <div className="mt-0 p-2 mx-auto" style={{ maxWidth: "700px", backgroundColor: "#f8f9fa", padding: "8px", borderRadius: "10px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" }}>
                <div style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", color: "#343a40", marginBottom: "0px" }}>{vidID}</div>
                {isPlaying ? (
                    <ReactPlayer 
                        url={url} 
                        controls 
                        playing 
                        width="100%" 
                        style={{ borderRadius: "10px" }} 
                    />
                ) : (
                    <img
                        src={thumbUrl}
                        alt="Video Thumbnail"
                        style={{ width: "100%", cursor: 'pointer', borderRadius: "10px", transition: "transform 0.3s ease" }}
                        onClick={handleThumbnailClick}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                )}
                <div style={{ fontSize: "20px", color: "#495057", marginTop: "15px" }}>{caption}</div>
               
            </div>
        </div>
    );
};

export default VideoPlayer;
