import React from "react";
import "./../App.css";

const ExerciseCard = ({ exercise }) => {
    return <div style={{ paddingTop: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={exercise.gifUrl} alt={exercise.name} Loading="lazy" style={{ height: "auto", width: "250px" }}></img>
            <div style={{ display: "flex", marginTop: "10px", fontFamily: 'MetropolisThin' }}>
                <button style={{ color: "black", background: "#dfdf3d", fontSize: "14px", borderRadius: "20px",fontFamily: 'MetropolisSemiBold', textTransform: "capitalize", padding: "5px 10px", border: "none", marginRight: "15px",fontWeight:"600" }}>{exercise.bodyPart}</button>
                <button style={{ color: "black", background: "#dfdf3d", fontSize: "14px", borderRadius: "20px",fontFamily: 'MetropolisSemiBold', textTransform: "capitalize", padding: "5px 10px", border: "none",fontWeight:"600"  }}>{exercise.target}</button>
            </div>
            <div style={{ textTransform: "capitalize", color: "black", padding: "8px", marginTop: "10px", fontFamily: 'MetropolisSemiBold' ,backgroundColor: "#dfdf3d", width: "100%", borderBottomLeftRadius: "13px",
            borderBottomRightRadius: "13px", textAlign: "center"}}>{exercise.name}</div>
    </div>
}

export default ExerciseCard;

