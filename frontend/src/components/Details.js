import React from "react";
import BodyPart from "./../assets/icons/body_part_black.png";
import Equipment from "./../assets/icons/equipment_black.png";
import Target from "./../assets/icons/target_black.png";

const Details = ({ exerciseDetail }) => {
    const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

    return <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "30px 50px", width: "100vw" }}>
        <div style={{ padding: '70px 50px', borderRadius: "75px", background: "white" }}>
            <img src={gifUrl} alt={name} Loading="lazy"></img>
        </div>

        <div style={{ height: "90vh", padding: " 50px" }}>
            <h1 style={{ fontWeight: "bold", color: "#dfdf3d", textTransform: "capitalize", textDecoration: "underline", marginBottom: "10px" }}>{name}</h1>
            <h6 style={{ fontWeight: "500", color: "white" }}> Exercises keep you strong. <span style={{textTransform: "capitalize"}}>{`${name} `}</span> is one of the best exercises to target your {target}. It will help you improve your mood and gain energy.</h6>
            <div>
            <div style={{display: "flex", justifyContent: 'flex-start', alignItems: "center"}}>
                <img src={BodyPart} alt={bodyPart} style={{margin: "20px 10px", height:"64px", width: "64px"}}/>
                <div style={{margin: "0 5px", color: "white", fontWeight:'500', textTransform: "capitalize", fontSize: "18px"}}>{bodyPart} </div>
            </div>
            <div style={{display: "flex", justifyContent: 'flex-start', alignItems: "center"}}>
                <img src={Target} alt={target} style={{margin: "20px 10px", height:"64px", width: "64px"}}/>
                <div style={{margin: "0 5px", color: "white", fontWeight:'500', textTransform: "capitalize", fontSize: "18px"}}>{target}</div>
            </div>
            <div style={{display: "flex", justifyContent: 'flex-start', alignItems: "center"}}>
                <img src={Equipment} alt={equipment} style={{margin: "20px 10px", height:"64px", width: "64px"}}/>
                <div style={{margin: "0 5px", color: "white", fontWeight:'500', textTransform: "capitalize", fontSize: "18px"}}>{equipment}</div>
            </div>
        </div>
        </div>

        
    </div>
}

export default Details;