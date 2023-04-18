import React from "react";
import "./login/Login&Signup.css";
import GoogleIcon from "./../assets/icons/google1-icon.png";
import FbIcon from "./../assets/icons/fb-icon2.png";
import LoginInfo from "./../assets/icons/login-icon.png";
import Navbar from "./../components/New_navbar";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const SignUp = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://fitness-app.com/fitnessapp/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                fullname: "Ananya",
                mobile: "8171569446",
                email: "gananya320@gmail.com",
                password: "31214568732",
            }),
            headers: {
                'Content-type': 'application/json',
            },
        }).then((error) => {
            console.log(error);
        })
    };

    return <div className="w-100 main-login gymImage" >
        <Navbar />
        <div style={{ zIndex: "1" }}>
            {/* <img src={LoginInfo} alt="person" style={{ position: "absolute", left: "49%", top: "17%", zIndex: "1" }} ></img> */}
            <form className="form pb-2" style={{ position: "absolute", left: "34%", margin: "40px" }}>
                <div className="name-div w-100">
                    <div className="f-name pr-3 w-47 first-name">
                        <label for="firstname" className="inputs-label">First Name</label>
                        <input type="text" id="firstname" placeholder="First Name" className="inputs"></input>
                    </div>
                    <div className="f-name w-47">
                        <label for="lastname" className="inputs-label">Last Name</label>
                        <input type="text" id="lastname" placeholder="Last Name" className="inputs"></input>
                    </div>
                </div>
                <label for="email" className="inputs-label">Email</label>
                <input type="email" id="email" placeholder="emailId@gmail.com" className="inputs"></input>
                <label for="contact" className="inputs-label">Mobile No.</label>
                <input type="tel" id="contact" placeholder="123-456-7890" className="inputs"></input>

                <label for="contact" className="inputs-label">Password</label>
                <input type="tel" id="contact" placeholder="****" className="inputs"></input>

                <button className="button" style={{ marginTop: "8px" }} onClick={handleSubmit}>Sign Up</button>
                <div style={{ marginTop: "6px", marginBottom: "15px", textAlign: "center", fontSize: "14px", color: "white" }} className="font-metro-regular">Already a member? <a href="/login" style={{ textDecoration: "none", color: 'yellow', fontWeight: "600" }}>Log In</a></div>
                {/* <hr style={{backgroundColor: "black", border: "none", height: "2px"}}/> */}
                <hr style={{ backgroundColor: "grey", border: "none", height: "2px" }} />
                {/* <hr style={{backgroundColor: "black", border: "none", height: "2px"}}/> */}
                <div style={{ position: "relative", left: "35%" }}>
                    <a href="https://www.google.com/" target="_blank" rel="noreferrer"><img src={GoogleIcon} alt="google-logo" style={{ height: "44px", width: "44px", marginRight: "20px", cursor: "pointer" }}></img></a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><img src={FbIcon} alt="facebook-logo" style={{ height: "44px", width: "44px", cursor: "pointer" }}></img></a>
                </div>
            </form>
        </div>
    </div>
}
export default SignUp;