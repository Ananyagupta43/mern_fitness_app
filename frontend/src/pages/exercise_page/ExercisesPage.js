import React, { useState } from "react";
import "./ExercisesPage.css";
import Navbar from "../../components/New_navbar";
import ModelFront from "./../../assets/images/FRONT.png";
import ModelBack from "./../../assets/images/BACK.png";
import SearchExercises from "../../components/SearchExercises";
import ExerciseCard from "../../components/ExerciseCard";
import { Pagination } from "@mui/material";
import { Spinner } from 'react-bootstrap';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 800, behaviour: "smooth" })

  }

  return <div style={{ color: "white", background: "linear-gradient(black, #201e1e)" }}>
    <Navbar />
    <SearchExercises setExercises={setExercises} setIsLoading={setIsLoading} setCurrentPage={setCurrentPage} />
    <div>
      {isLoading ? <Spinner animation="border" variant="info" style={{ position: "absolute", left: "50%" }} /> :
        exercises.length > 0 && (
          <h4 style={{ color: "white", paddingLeft: "30px" }}>Showing Exercises...</h4>

        )
      }

      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap" }}>
        {
          currentExercises.map((exercise, index) => (
            <div style={{ margin: "25px 10px", borderRadius: "15px", cursor: "pointer", width: "380px", height: "auto", backgroundColor: "white", boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}>
              <ExerciseCard key={index} exercise={exercise} />
            </div>
          ))
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {
          exercises.length > exercisesPerPage && (
            <Pagination color="secondary" shape="rounded" defaultPage={1}
              count={Math.ceil(exercises.length / exercisesPerPage)} page={currentPage}
              onChange={paginate} size="large"
              style={{ padding: "20px" }}
            />
          )
        }
      </div>
    </div>

  </div>
}

export default ExercisesPage;