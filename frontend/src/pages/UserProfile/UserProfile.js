import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/New_navbar";
import "./UserProfile.css";

const UserProfile = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const [tempCustomer, setTempCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    _id: ""
  });
  const [changeInfo, setChangedInfo] = useState(false);


  useEffect(() => {
    callGetStarted();    //we can not use  asyn function inside use effect
  }, []) //runs only a single time on page reload

  const callGetStarted = async () => {
    try {
      const res = await fetch('/profile', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);
      setTempCustomer(data);
      if (!res.status === 200) {

        const err = new Error(res.error);
        throw err;
      }
    } catch (err) {
      navigate("/login");
    }
  }


  const updateInfo = async (e) => {
    e.preventDefault();
    console.log(tempCustomer);
    const { first_name, last_name, email, phone, password, _id } = tempCustomer;
    const res = await fetch("/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        first_name, last_name, email, phone, password, _id
      })

    })
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Please fill all the fields");
      // console.log(res);
    } else {
      window.alert("Updated Successfully");
      setChangedInfo(false)
      navigate("/userProfile");
    }
  }

  return (

    <div class="welcome-container">
      <Navbar />
      <div className="profile-main-container">
        <form method="PUT">
          <div className="profile-container">
            <div className="profile-rows user w-100">USER PROFILE</div>
            <div className="profile-rows w-100 mt-4">
              <div className="w-50">First Name</div>
              <input type="text user-input" id="first_name"
                className="w-50 center-input"
                value={tempCustomer.first_name}
                onChange={(e) => {
                  setChangedInfo(true)
                  setTempCustomer({ ...tempCustomer, first_name: e.target.value })
                }} />
            </div>

            <div className="profile-rows w-100 mt-4">
              <div className="w-50">Last Name</div>
              <input type="text" id="last_name" className="w-50 center-input user-input" value={tempCustomer.last_name}
                onChange={(e) => {
                  setChangedInfo(true)
                  setTempCustomer({ ...tempCustomer, last_name: e.target.value })
                }}
              />
            </div>

            <div className="profile-rows w-100 mt-4">
              <div className="w-50">Phone Number</div>
              <input type="text" id="phone" className="w-50 center-input user-input" value={tempCustomer.phone}
                onChange={(e) => {
                  setChangedInfo(true)
                  setTempCustomer({ ...tempCustomer, phone: e.target.value })
                }}
              />
            </div>

            <div className="profile-rows w-100 mt-4">
              <div className="w-50">Email</div>
              <input type="text" id="email" className="w-50 center-input user-input" value={tempCustomer.email}
                onChange={(e) => {
                  setChangedInfo(true)
                  setTempCustomer({ ...tempCustomer, email: e.target.value })
                }}
              />
            </div>

            {changeInfo ? <div className="profile-rows w-100 mt-4">
              <button className="button" onClick={((e) => {
                setTempCustomer({ ...userData })
                setChangedInfo(false)

              })}>Cancel</button>
              <button className="button" onClick={updateInfo}>Save</button>
            </div> : null}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile