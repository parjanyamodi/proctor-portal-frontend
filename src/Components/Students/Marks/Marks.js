import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();

const get_gp = (grade) => {
  console.log(grade);
  if (grade === "S") return 10;
  else if (grade === "A") return 9;
  else if (grade === "B") return 8;
  else if (grade === "C") return 7;
  else if (grade === "D") return 6;
  else return 5;
};

const get_sgpas = (marks) => {
  var keys = Object.keys(marks);
  keys.forEach((sem) => {
    let credits_total = 0;
    let sgpa = 0;
    marks[sem].forEach((mark) => {
      var credits = parseInt(mark.credits);
      credits_total += credits;
      sgpa += credits * get_gp(mark.grade);
      console.log(sgpa);
    });
    // console.log(`credits in sem ${sem} = ${credits_total}`)
    marks[sem].push(credits_total);
    marks[sem].push(sgpa / credits_total);
  });
};

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
  get_sgpas(marks);
  return [marks, Object.keys(marks)];
};

const StudentMarks = () => {
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  const [studentDetails, setstudDetail] = useState("abc");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4500/student?sid=${userInfo.googleId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Student Profile Not Found") {
          setstudDetail("");
        } else {
          fetch(`http://localhost:4500/student/marks?usn=${data.usn}`)
            .then((response) => response.json())
            .then((dat) => {
              setMarks(dat);
            });
        }
      });
  }, []);
  // console.log(marks);
  const [studentMarks, semesters] = process_marks(marks);
  // console.log(studentDetails);
  // console.log(studentMarks);
  return (
    <>
      {studentDetails ? (
        <>
          <NavBar googleProfile={googleProfile} />
          <div className="container">
            <div className="row">
              <div className="col-12 first-div-home">
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                    viewBox="0 0 16 16"
                    role="img"
                    aria-label="Warning:"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  *For better viewing experience use Landscape Mode.
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                {semesters.map((sem, val) => {
                  return (
                    <div class="alert alert-dark" role="alert">
                      <div class="alert alert-primary" role="alert">
                        <p>
                          <strong>
                            <span class="pull-left">Semester {sem}</span>

                            <span class="pull-right">
                              SGPA :
                              {" " +
                                studentMarks[sem][
                                  studentMarks[sem].length - 1
                                ] +
                                " "}
                            </span>
                            <span class="pull-right">
                              Total Credits :
                              {" " +
                                studentMarks[sem][
                                  studentMarks[sem].length - 2
                                ] +
                                " "}
                              &emsp;&emsp;&emsp;&emsp;
                            </span>
                          </strong>
                        </p>
                      </div>

                      <table class="table table-primary table-hover table-striped table-corner">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Title</th>
                            <th scope="col">Credits</th>
                            <th scope="col">Faculty</th>
                            <th scope="col">Attendance</th>
                            <th scope="col">Internal</th>
                            <th scope="col">SEE</th>
                            <th scope="col">Grade</th>
                            <th scope="col">Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentMarks[sem].map((value, index) => {
                            if (value.cid)
                              return (
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>{value["cid"]}</td>
                                  <td>{value["title"]}</td>
                                  <td>{value["credits"]}</td>
                                  <td>{value["course_faculty"]}</td>
                                  <td>{value["attendance"]}</td>
                                  <td>{value["internal"]}</td>
                                  <td>{value["see"]}</td>
                                  <td>{value["grade"]}</td>
                                  <td>{value["year"]}</td>
                                </tr>
                              );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>{/*window.location.replace("/")*/}</>
      )}
    </>
  );
};
export default StudentMarks;
