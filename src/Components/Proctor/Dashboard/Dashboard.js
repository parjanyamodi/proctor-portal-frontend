import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();

const ProctorDashboard = () => {
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  const [proctorProfile, setproctorprofile] = useState("");
  useEffect(() => {
    fetch(`http://localhost:4500/proctor?pid=${userInfo.googleId}`)
      .then((response) => response.json())
      .then((dat) => {
        console.log(dat);
        dat.img = googleProfile.imageUrl.substr(
          0,
          googleProfile.imageUrl.length - 6
        );
        setproctorprofile(dat);
        if (dat)
          fetch(`http://localhost:4500/proctor`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dat),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Proctor Profile Updated", data);
            });
      });
  }, []);
  return (
    <>
      <NavBar googleProfile={googleProfile} />
      <div className="container">
        <div className="row">
          <div className="col-12 first-div-home">
            <div class="card text-center">
              <div class="card-header">
                Dept. of {proctorProfile.department}
              </div>
              <div class="card-body">
                <img
                  class="card-img-top profile-image"
                  src={googleProfile.imageUrl.substr(
                    0,
                    googleProfile.imageUrl.length - 6
                  )}
                  alt={proctorProfile.name}
                />
                <h3 class="card-title">
                  {proctorProfile.name} - {proctorProfile.initials}
                </h3>
                <p class="card-title">{proctorProfile.qualifications}</p>
                <h5 class="card-title">{proctorProfile.designation}</h5>
                <p class="card-text">
                  <a href={"mailto:" + proctorProfile.email}>
                    {proctorProfile.email}
                  </a>
                </p>
                <h6 class="card-text">{proctorProfile.gender}</h6>
                <h6 class="card-text">{proctorProfile.phoneNumber}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProctorDashboard;
