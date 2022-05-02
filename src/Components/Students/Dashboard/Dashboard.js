import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();

const StudentDashboard = () => {
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  const [studentDetails, setstudDetail] = useState("abc");
  const [studentAdditionalDetails, setStudentAddDet] = useState({});
  const [studentProctor, setStudentProctor] = useState("");

  useEffect(() => {
    fetch(`http://192.168.0.106:4500/student?sid=${userInfo.googleId}`)
      .then((response) => response.json())
      .then((dat) => {
        if (dat.message === "Student Profile Not Found") {
          setstudDetail("");
        } else {
          dat.img = googleProfile.imageUrl.substr(
            0,
            googleProfile.imageUrl.length - 6
          );
          setstudDetail(dat);
          cookies.set("studentInfo", dat, {
            path: "/",
          });

          if (dat) {
            fetch(`http://192.168.0.106:4500/student/details?usn=${dat["usn"]}`)
              .then((response) => response.json())
              .then((data) => {
                if (dat.message === "Student Profile Not Found") {
                  setStudentAddDet("");
                } else {
                  var value = JSON.parse(data["data"]);
                  setStudentAddDet(value);
                }
              });
          }
          if (dat) {
            fetch(`http://192.168.0.106:4500/student/proctor?sid=${dat["sid"]}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (dat.message === "Student Proctor Not Found") {
                  setStudentProctor("");
                } else {
                  setStudentProctor(data);
                }
                if (dat) {
                  fetch(`http://192.168.0.106:4500/student`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dat),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log("Student Profile Updated", data);
                    });
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
              <div className="col-lg-6 mt-3 first-div-home">
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
                      alt={studentDetails.name}
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
              <div className="col-lg-6 mt-3 first-div-home">
                <div class="card text-center">
                  <div class="card-header">
                    Dept. of {studentProctor.department}
                  </div>
                  <div class="card-body">
                    <img
                      class="card-img-top profile-image"
                      src={studentProctor.image}
                      alt={studentProctor.name}
                    />
                    <h3 class="card-title">
                      {studentProctor.name} - {studentProctor.initials}
                    </h3>
                    <p class="card-title">{studentProctor.qualifications}</p>
                    <h6 class="card-title">{studentProctor.designation}</h6>
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
              <div className="col-12 mt-3">
                <div class="card text-left">
                  <div class="card-header">Additional Details of Student</div>
                  <div class="card-body">
                    {Object.keys(studentAdditionalDetails).map((val) => {
                      return (
                        <p>
                          {val} : {studentAdditionalDetails[val]}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
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
