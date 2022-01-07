import React from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();

const StudentDashboard = () => {
  const googleProfile = cookies.get("GoogleProfile");
  const Token = cookies.get("Token");
  const studentDetails = cookies.get("studentDetails");
  const studentMarks = cookies.get("studentMarks");
  fetch(`http://localhost:4500/student/marks?usn=1BM19CS084`)
    .then((respons) => respons.json())
    .then((dat) => {
      console.log(dat);
      studentAdditionalDetails = process_details(dat);
    });
  const process_details = (data) => {
    return [data, Object.keys(data)];
  };
  const studentAdditionalDetails = cookies.get("studentAdditionalDetails");
  console.log(Token);
  console.log(studentDetails);
  console.log(studentMarks);
  console.log(studentAdditionalDetails);

  return (
    <>
      {studentDetails ? (
        <>
          <NavBar googleProfile={googleProfile} />
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
              {studentAdditionalDetails ? (
                <p>{String(studentAdditionalDetails)}</p>
              ) : (
                <p>No</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>{window.location.replace("/")}</>
      )}
    </>
  );
};
export default StudentDashboard;
