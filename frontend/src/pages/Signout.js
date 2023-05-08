import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';



const Signout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    callGetStarted();    //we can not use  asyn function inside use effect
  }, []) //runs only a single time on page reload

  const callGetStarted = async () => {
    try {
      const res = await fetch('/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include"
      });
      const data = await res.json();

      if (!res.status === 200 || !data) {
        const err = new Error(res.error);
        throw err;

      } else {
        const token = JSON.parse(localStorage.getItem('jwtoken'));
        if (token) {
          localStorage.removeItem("jwtoken");
        }
        const mailId = JSON.parse(localStorage.getItem('email'));
        if (mailId) {
          localStorage.removeItem("email");
        }

        navigate("/");
      }
    } catch (err) {
      navigate("/login");
    }
  }

  return (
    <div class="welcome-container">Signout</div>
  )
}

export default Signout