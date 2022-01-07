import React from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();

const process_marks = (allMarks) => {
  var marks = {};
  for (const mark of allMarks) {
    // console.log(mark["semester"]);
    if (marks[mark["semester"]]) {
      //   console.log(marks[mark["semester"]]);
      marks[mark["semester"]].push(mark);
    } else {
      marks[mark["semester"]] = [mark];
    }
  }
  return [marks, Object.keys(marks)];
};

const StudentMarks = () => {
  const googleProfile = cookies.get("GoogleProfile");
  const Token = cookies.get("Token");
  const studentDetails = cookies.get("studentDetails");
  const [studentMarks, semesters] = process_marks(cookies.get("studentMarks"));
  console.log(Token);
  console.log(studentDetails);
  console.log(studentMarks);

  return (
    <>
      {studentDetails ? (
        <>
          <NavBar googleProfile={googleProfile} />
          <div className="container">
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-8 first-div-home">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Course Code</th>
                      <th scope="col">Faculty</th>
                      <th scope="col">Attendance</th>
                      <th scope="col">Internal</th>
                      <th scope="col">SEE</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesters.map((sem, val) => {
                      return (
                        <>
                          <tr>Semester {sem}</tr>
                          {studentMarks[sem].map((value, index) => {
                            return (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{value["cid"]}</td>
                                <td>{value["course_faculty"]}</td>
                                <td>{value["attendance"]}</td>
                                <td>{value["internal"]}</td>
                                <td>{value["see"]}</td>
                                <td>{value["grade"]}</td>
                                <td>{value["year"]}</td>
                              </tr>
                            );
                          })}
                        </>
                      );
                    })}
                  </tbody>
                </table>

                <p></p>
              </div>
              <div className="col-lg-5"></div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </>
      ) : (
        <>{window.location.replace("/")}</>
      )}
    </>
  );
};
export default StudentMarks;
