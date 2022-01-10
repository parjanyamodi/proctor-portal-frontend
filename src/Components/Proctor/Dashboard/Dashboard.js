import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();


const ProctorDashboard = () => {
  
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  const [proctorProfile, setproctorprofile] = useState("")
  useEffect(()=> {
    fetch(`http://localhost:4500/proctor?pid=${userInfo.googleId}`)
      .then((response) => response.json())
      .then((dat) => {
        console.log(dat)
        setproctorprofile(dat)
      })
  }, [])
  return (
    <>
      <NavBar googleProfile={googleProfile} />
      <div className="container">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-5 first-div-home">
            <p>
              <span className="home-details-title name">Name : </span>
              <span className="home-details-content name">{proctorProfile.name}</span>
            </p>
            <p>
              <span className="home-details-title">Phone Number : </span>
              <span className="home-details-content">{proctorProfile.phoneNumber}</span>
            </p>
            <p>
              <span className="home-details-title">Email : </span>
              <span className="home-details-content">{proctorProfile.email}</span>
            </p>
            <p>
              <span className="home-details-title">Department : </span>
              <span className="home-details-content">{proctorProfile.department}</span>
            </p>
            <p>
              <span className="home-details-title">Designation : </span>
              <span className="home-details-content">{proctorProfile.designation}</span>
            </p>
          </div>
          <div className="col-lg-5">
            <p>
              <img className="profile-image" src={proctorProfile.img}></img>
            </p>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
    </>
  );
};
export default ProctorDashboard;
