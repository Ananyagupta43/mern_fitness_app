import React from "react";

const ExerciseVideos = ({ exerciseVideos, name }) => {
    return <div style={{ padding: " 20px 50px"}}>
        <h1 style={{ marginBottom: "10px", color:"white" }}>Watch <span style={{ fontWeight: "bold", color: "#dfdf3d", textTransform: "capitalize", textDecoration: "underline" }}>{name}</span> exercise videos</h1>
        <div style={{ display: 'flex', justifyContent: "space-around", flexWrap: "wrap", flexDirection: "row", padding: "20px 0" }}>
            {
                exerciseVideos?.slice(0, 6).map((item, index) => (
                    <a key={index} href={`https://www.youtube.com/watch?v=${item.video.videoId}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "black" }}>
                        <div style={{margin: "20px 0"}}>
                            <img src={item.video.thumbnails[0].url} alt={item.video.title} style={{ width: "400px", height: "auto" }} />
                            <h5 style={{ marginBottom: "1px", color: "white", maxWidth: "400px" }}>{item.video.title}</h5>
                            <h5 style={{ color: "#dfdf3d", fontWeight: "900" }}>{item.video.channelName}</h5>
                        </div>
                    </a>
                ))
            }
        </div>
    </div>
}

export default ExerciseVideos;