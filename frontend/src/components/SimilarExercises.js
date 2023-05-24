import React, { useState } from "react";
import Loader from "./../components/Loader";
import ExerciseCard from "./ExerciseCard";
import { Pagination } from "@mui/material";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises, setIsReady }) => {
    console.log(equipmentExercises);
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 6;
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const targetExercises = targetMuscleExercises.slice(indexOfFirstExercise, indexOfLastExercise);
    const equipmentExercise = equipmentExercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 1200, behaviour: "instant" })
    }

    return <div style={{ padding: "0 50px" }}>

        <h1 style={{color: "white"}}>Exercises that <span style={{ color: "#dfdf3d", textTransform: "capitalize", textDecoration: "underline", margin: "0 10px" }}>target the same muscle </span> group</h1>
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap" }}>
            {
                targetMuscleExercises.length ? (
                    targetExercises.map(item => (
                        <div style={{ margin: "25px 10px", borderRadius: "15px", cursor: "pointer", width: "380px", height: "auto", backgroundColor: "white", boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}>
                            <ExerciseCard exercise={item} />
                        </div>
                    )
                    )
                ) : <Loader />
            }
            <div style={{ display: "flex", justifyContent: "center" }}>
                {
                    targetMuscleExercises.length > exercisesPerPage && (
                        <Pagination color="secondary" shape="rounded" defaultPage={1}
                            count={Math.ceil(targetMuscleExercises.length / exercisesPerPage)} page={currentPage}
                            onChange={paginate} size="large"
                            style={{ padding: "20px" }}
                        />
                    )
                }
            </div>
        </div>
        
        <h1 style={{color: "white"}}>Exercises that uses the same <span style={{ color: "#dfdf3d", textTransform: "capitalize", textDecoration: "underline", margin: "0 10px" }}> equipment </span></h1>
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap" }}>
            {
                equipmentExercises.length ? (
                    equipmentExercise.map(item => (
                        <div style={{ margin: "25px 10px", borderRadius: "15px", cursor: "pointer", width: "380px", height: "auto", backgroundColor: "white", boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}>
                            <ExerciseCard exercise={item} />
                        </div>
                    )
                    )
                ) : <Loader />
            }
            <div style={{ display: "flex", justifyContent: "center" }}>
                {
                    equipmentExercises.length > exercisesPerPage && (
                        <Pagination color="secondary" shape="rounded" defaultPage={1}
                            count={Math.ceil(equipmentExercises.length / exercisesPerPage)} page={currentPage}
                            onChange={paginate} size="large"
                            style={{ padding: "20px" }}
                        />
                    )
                }
            </div>
        </div>
    </div>
}

export default SimilarExercises;