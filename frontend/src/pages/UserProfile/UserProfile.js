import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/New_navbar";
import "./UserProfile.css";

const UserProfile = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState('');
    const [tempCustomer,setTempCustomer]=useState('');

  

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


    // const updateInfo=async ()=>{
    //   try {
    //     const res = await fetch('/update', {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //       credentials: "include"
    //     });
    //     const data = await res.json();
     
    //     if (!res.status === 200) {
  
    //       const err = new Error(res.error);
    //       throw err;
    //     }
    //   } catch (err) {
    //     navigate("/login");
    //   }
    // }

  return (

    <div  class="welcome-container">
        <Navbar/>
        <div className="profile-main-container">
          <form method="PUT">
            <div  className="profile-container">
                <div  className="profile-rows user w-100">USER PROFILE</div>
              <div  className="profile-rows w-100 mt-4">
                <div className="w-50">First Name</div>
                <input type="text" id="first_name" className="w-50 center-input" value={tempCustomer.first_name} 
                onChange={(e)=>{
               setTempCustomer({...tempCustomer,first_name:e.target.value})
                }}/>
                </div>  

                <div  className="profile-rows w-100 mt-4">
                <div className="w-50">Last Name</div>
                <input type="text" id="last_name" className="w-50 center-input" value={tempCustomer.last_name}
                 onChange={(e)=>{
                    setTempCustomer({...tempCustomer,last_name:e.target.value})
                     }}
                />
                </div> 

                <div  className="profile-rows w-100 mt-4">
                <div className="w-50">Phone Number</div>
                <input type="text" id="phone" className="w-50 center-input" value={tempCustomer.phone}
                 onChange={(e)=>{
                    setTempCustomer({...tempCustomer,phone:e.target.value})
                     }}
                />
                </div> 

                <div  className="profile-rows w-100 mt-4">
                <div className="w-50">Email</div>
                <input type="text" id="email" className="w-50 center-input" value={tempCustomer.email} 
                 onChange={(e)=>{
                    setTempCustomer({...tempCustomer,email:e.target.value})
                     }}
                />
                </div> 
                
                
            </div>
            </form>
        </div>
        </div>
  )
}

export default UserProfile