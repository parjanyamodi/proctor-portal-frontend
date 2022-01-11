import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();

const StudentDashboard = () => {
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  const [studentDetails, setstudDetail] = useState("abc");
  const [studentAdditionalDetails, setStudentAddDet] = useState("");
  const [studentProctor, setStudentProctor] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4500/student?sid=${userInfo.googleId}`)
      .then((response) => response.json())
      .then((dat) => {
        if (dat.message === "Student Profile Not Found") {
          setstudDetail("");
        } else {
          setstudDetail(dat);
          if (dat) {
            fetch(`http://localhost:4500/student/details?usn=${dat["usn"]}`)
              .then((response) => response.json())
              .then((data) => {
                if (dat.message === "Student Profile Not Found") {
                  setStudentAddDet("");
                } else {
                  setStudentAddDet(JSON.parse(data["data"]));
                }
              });
          }
          if (dat) {
            fetch(`http://localhost:4500/student/proctor?sid=${dat["sid"]}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (dat.message === "Student Proctor Not Found") {
                  setStudentProctor("");
                } else {
                  setStudentProctor(data);
                }
              });
          }
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
              <div className="col-6 first-div-home">
                <div class="card text-center">
                  <div class="card-header">
                    Dept. of {studentDetails.department}
                  </div>
                  <div class="card-body">
                    <img
                      class="card-img-top profile-image"
                      src={googleProfile.imageUrl.substr(
                        0,
                        googleProfile.imageUrl.length - 6
                      )}
                      alt="Card image cap"
                    />
                    <h3 class="card-title">{studentDetails.name}</h3>
                    <h5 class="card-title">{studentDetails.usn}</h5>
                    <p class="card-text">
                      <a href={"mailto:" + googleProfile.email}>
                        {googleProfile.email}
                      </a>
                    </p>
                    <h6 class="card-text">{studentDetails.gender}</h6>
                    <h6 class="card-text">{studentDetails.phno}</h6>
                    <h6 class="card-text">
                      Semester : {studentDetails.semester}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-6 first-div-home">
                <div class="card text-center">
                  <div class="card-header">
                    Dept. of {studentProctor.department}
                  </div>
                  <div class="card-body">
                    <img
                      class="card-img-top profile-image"
                      src={studentProctor.image}
                      alt="Card image cap"
                    />
                    <h3 class="card-title">{studentProctor.name}</h3>
                    <h6 class="card-title">{studentProctor.designation}</h6>
                    <h5 class="card-title">{studentProctor.qualifications}</h5>
                    <p class="card-text">
                      <a href={"mailto:" + studentProctor.email}>
                        {studentProctor.email}
                      </a>
                    </p>
                    <h6 class="card-text">{studentProctor.phoneNumber}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <p>
                {Object.keys(studentAdditionalDetails).map((val, index) => {
                  console.log(val, index);
                  return (
                    <>
                      {val} : {studentAdditionalDetails[val]}
                    </>
                  );
                })}
              </p>
            </div>
            <div className="row">
              <p></p>
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
