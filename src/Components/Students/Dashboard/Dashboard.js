import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();

const StudentDashboard = () => {
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  const [studentDetails, setstudDetail] = useState("abc");
  const [studentAdditionalDetails, setStudentAddDet] = useState("");
  // console.log(userInfo.googleId);
  // console.log(googleProfile);
  console.log(studentAdditionalDetails);
  useEffect(() => {
    fetch(`http://localhost:4500/student?sid=${userInfo.googleId}`)
      .then((response) => response.json())
      .then((dat) => {
        if (dat.message === "Student Profile Not Found") {
          setstudDetail("");
        } else {
          setstudDetail(dat);
          // console.log(studentDetails)
        }
      });
      fetch(`http://localhost:4500/student/details?usn=${studentDetails["usn"]}`)
      .then((response) => response.json())
      .then((dat) => {
        if (dat.message === "Student Profile Not Found") {
          setStudentAddDet("");
        } else {
          setStudentAddDet(JSON.parse(dat["data"]));
          console.log(studentAdditionalDetails)
        }
      });
  }, []);

  // console.log(studentDetails);
  return (
    <>
      {studentDetails ? (
        <>
          <NavBar />
          <div className="container">
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5 first-div-home">
                <p>
                  <span className="home-details-title name">Name : </span>
                  <span className="home-details-content name">
                    {googleProfile.name}
                  </span>
                </p>
                <p>
                  <span className="home-details-title">USN : </span>
                  <span className="home-details-content">
                    {studentDetails.usn}
                  </span>
                </p>
                <p>
                  <span className="home-details-title">Email : </span>
                  <span className="home-details-content">
                    {googleProfile.email}
                  </span>
                </p>
                <p>
                  <span className="home-details-title">Department : </span>
                  <span className="home-details-content">
                    {studentDetails.department}
                  </span>
                </p>
                <p>
                  <span className="home-details-title">Gender : </span>
                  <span className="home-details-content">
                    {studentDetails.gender}
                  </span>
                </p>
              </div>
              <div className="col-lg-5">
                <p>
                  <img
                    className="profile-image"
                    src={googleProfile.imageUrl}
                  ></img>
                </p>
              </div>
              <div className="col-lg-1"></div>
            </div>
            <div className="row">
              <p>
                {Object.keys(studentAdditionalDetails).map((val, index)=> {
                  console.log(val, index)
                  return <>
                  {val} : {studentAdditionalDetails[val]}
                  </>
                })}
              </p>
            </div>
          </div>
          
        </>
      ) : (
        <>{/*window.location.replace("/")*/}</>
      )}
    </>
  );
};
export default StudentDashboard;
