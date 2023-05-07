import React, { useEffect, useState } from "react";
import Navbar from "./../components/New_navbar";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import workout from '../assets/images/workoutBody.gif';
import ExercisesPage from "./exercise_page/ExercisesPage";


const GetStarted = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  useEffect(() => {
    callGetStarted();    //we can not use  asyn function inside use effect
  }, []) //runs only a single time on page reload

  const callGetStarted = async () => {
    try {
      const res = await fetch('/GetStarted', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);
      if (!res.status === 200) {

        const err = new Error(res.error);
        throw err;
      }
    } catch (err) {
      navigate("/login");
    }
  }

  const changePage=()=>{
    navigate("/exercisespage");
  }

  return (
    <div className="welcome-container">
      <Navbar />
      <div className="welcome-text">
        <form method="GET" className="get-started">
        <div className="start-container">
        <img src={workout} style={{height:"200px",width:"350px"}}/>
          <div style={{fontSize:'60px'}}>Welcome {userData.first_name}!</div>
          {/* <div style={{fontSize:'50px'}}>{userData.first_name}</div> */}
          <div style={{fontSize:'20px'}}>We are thrilled to have you as our fitness partner. Get started with your fitness journey now!</div>
          <button className="button" onClick={changePage}>Get Started</button>
          </div>



        </form>
      </div>
    </div>
  )
}

export default GetStarted