import React, { useState } from "react";
import './Login&Signup.css';
import { Checkbox, Stack } from "@mui/material";
import LoginInfo from "./../../assets/icons/login-icon.png";
import Navbar from "./../../components/New_navbar";
import Gym from "./../../assets/images/gym.jpg"
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })

        });

        const data = await res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid User Credentails");
        } else {
            window.alert("Login Successful");
            localStorage.setItem('jwtoken', JSON.stringify(data.jwtoken));
            localStorage.setItem('email', JSON.stringify(data.email));
            navigate("/Getstarted");
        }

    }

    return <Stack direction="column" className="gymImage" >
        <Navbar />

        <div style={{ width: "100%", height: "577px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={LoginInfo} alt="person" style={{ position: "absolute", left: "48%", bottom: "67%", zIndex: "1" }} ></img>
            <form className="form" method="POST">
                <label htmlFor="email" className="inputs-label">Email  </label>
                <input type="text" placeholder="email@gmail.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="inputs"></input>
                <label htmlFor="password" className="inputs-label">Password  </label>
                <input type="password" placeholder="****" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="inputs"></input>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", marginTop: "5px", marginBottom: "10px" }}>
                    <div style={{ display: "flex", color: "white" }}>

                        <div style={{ paddingTop: "1px" }} className="font-metro">Not a member yet ?</div>
                    </div>
                    <a href="/signUp" style={{ textDecoration: "none", color: 'yellow', fontWeight: "600" }} className="font-metro">Sign Up</a>
                </div>

                <button className="button" onClick={loginUser}>Log In</button>
            </form>
        </div>

    </Stack>
}
export default Login;