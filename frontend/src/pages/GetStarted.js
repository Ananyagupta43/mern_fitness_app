import React, { useEffect, useState } from "react";
import Navbar from "./../components/New_navbar";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';



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

  return (
    <div className="welcome-container">
      <Navbar />
      <div className="welcome-text">
        <form method="GET">
          <div>Welcome</div>
          <div>{userData.first_name}</div>
          <div>We are thrilled to have you on board in this fitness journey. </div>
        </form>
      </div>
    </div>
  )
}

export default GetStarted