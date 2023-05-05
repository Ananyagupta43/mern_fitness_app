import React, { useState } from "react";
import "./login/Login&Signup.css";
import GoogleIcon from "./../assets/icons/google1-icon.png";
import FbIcon from "./../assets/icons/fb-icon2.png";
import LoginInfo from "./../assets/icons/login-icon.png";
import Navbar from "./../components/New_navbar";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: ""

    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { first_name, last_name, email, phone, password } = user;
        const res = await fetch("/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                first_name, last_name, email, phone, password   //copied from above since both key and value are same so we will not write them twice
            })

        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
            // console.log(res);
        } else {
            window.alert("Registration Successful");
            navigate("/login");
        }
    };

    let idVal, value;
    const handleInputs = (e) => {
        idVal = e.target.id;
        value = e.target.value
        setUser({ ...user, [idVal]: value }); // dynamicaaly getting the id and setting its value

    }
    return <div className="w-100 main-login gymImage" >
        <Navbar />
        <div style={{ zIndex: "1" }}>
            {/* <img src={LoginInfo} alt="person" style={{ position: "absolute", left: "49%", top: "17%", zIndex: "1" }} ></img> */}
            <form className="form pb-2" style={{ position: "absolute", left: "34%", margin: "40px" }} method="POST">
                <div className="name-div w-100">
                    <div className="f-name pr-3 w-47 first-name">
                        <label htmlFor="first_name" className="inputs-label">First Name</label>
                        <input type="text" id="first_name" value={user.first_name} onChange={handleInputs} placeholder="First Name" className="inputs"></input>
                    </div>
                    <div className="f-name w-47">
                        <label htmlFor="last_name" className="inputs-label">Last Name</label>
                        <input type="text" id="last_name" value={user.last_name} onChange={handleInputs} placeholder="Last Name" className="inputs"></input>
                    </div>
                </div>
                <label htmlFor="email" className="inputs-label">Email</label>
                <input type="email" id="email" value={user.email} onChange={handleInputs} placeholder="emailId@gmail.com" className="inputs"></input>

                <label htmlFor="phone" className="inputs-label">Mobile No.</label>
                <input type="text" id="phone" placeholder="123-456-7890" value={user.phone} onChange={handleInputs} className="inputs"></input>

                <label htmlFor="password" className="inputs-label">Password</label>
                <input type="password" id="password" value={user.password} onChange={handleInputs} placeholder="****" className="inputs"></input>

                <button className="button" style={{ marginTop: "8px" }} onClick={handleSubmit} >Sign Up</button>
                <div style={{ marginTop: "6px", marginBottom: "15px", textAlign: "center", fontSize: "14px", color: "white" }} className="font-metro-regular">Already a member? <a href="/login" style={{ textDecoration: "none", color: 'yellow', fontWeight: "600" }}>Log In</a></div>


            </form>
        </div>
    </div>
}
export default SignUp;