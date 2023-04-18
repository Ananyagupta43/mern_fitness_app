import React from "react";
import './Login&Signup.css';
import { Checkbox, Stack } from "@mui/material";
import LoginInfo from "./../../assets/icons/login-icon.png";
import Navbar from "./../../components/New_navbar";
import Gym from "./../../assets/images/gym.jpg"
const Login = () => {

    return <Stack direction="column" className="gymImage" >
        <Navbar />

        <div style={{ width: "100%", height: "577px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={LoginInfo} alt="person" style={{ position: "absolute", left: "48%", bottom: "67%", zIndex: "1" }} ></img>
            <form className="form">
                <label for="username" className="inputs-label">UserName  </label>
                <input type="text" placeholder="Name" id="username" className="inputs"></input>
                <label for="password" className="inputs-label">Password  </label>
                <input type="password" placeholder="****" id="password" className="inputs"></input>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", marginTop: "5px", marginBottom: "10px" }}>
                    <div style={{ display: "flex", color: "white" }}>
                        <Checkbox style={{ height: "10px", width: "10px", marginRight: "5px", color: "white" }}></Checkbox>
                        <div style={{ paddingTop: "1px" }} className="font-metro">Remember Me</div>
                    </div>
                    <div style={{ color: "white" }} className="font-metro">Forgot Password</div>
                </div>

                <button className="button">Log In</button>
            </form>
        </div>

    </Stack>
}
export default Login;