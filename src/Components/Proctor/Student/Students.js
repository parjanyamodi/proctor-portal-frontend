import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProctorStudents = () => {
  const get_gp = (grade) => {
    // console.log(grade);
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
        // console.log(sgpa);
      });
      marks[sem].push(credits_total);
      marks[sem].push(sgpa / credits_total);
    });
  };

  const process_marks = (allMarks) => {
    var marks = {};
    for (const mark of allMarks) {
      if (marks[mark["semester"]]) {
        marks[mark["semester"]].push(mark);
      } else {
        marks[mark["semester"]] = [mark];
      }
    }
    get_sgpas(marks);
    return [marks, Object.keys(marks)];
  };
  const processStudents = (students) => {
    var semesters = semester;
    students.map((val) => {
      if (!semesters.includes(val.semester)) semesters.push(val.semester);
    });
    setSemester(semester);
    return;
  };
  const updateSelection = async (sid) => {
    await fetch(`http://localhost:4500/student?sid=${sid}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        // processStudents(data)
        var cs = selection[0];
        cs.untouched = false;
        cs["profile"] = data;
        setSelection([cs]);
        console.log(selection);
      });
    if (selection[0] && selection[0]["profile"])
      await fetch(
        `http://localhost:4500/student/marks?usn=${selection[0].profile.usn}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          // processStudents(data)
          var cs = selection[0];
          cs["marks"] = process_marks(data);
          setSelection([cs]);
          console.log(selection);
        });
    if (selection[0] && selection[0]["profile"])
      await fetch(
        `http://localhost:4500/student/details?usn=${selection[0].profile.usn}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          // processStudents(data)
          var cs = selection[0];
          cs["details"] = data;
          setSelection([cs]);
          console.log(selection);
        });
  };
  const [semester, setSemester] = useState([]);
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  console.log(userInfo);
  const [students, setStudents] = useState([]);
  const [semSelection, setsemSelection] = useState("All");
  const [selection, setSelection] = useState([{ untouched: true }]);
  useEffect(() => {
    fetch(`http://localhost:4500/proctor/students?pid=${userInfo.googleId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        processStudents(data);
        setStudents(data);
      });
  }, []);

  return (
    <>
      <NavBar googleProfile={googleProfile} />
      <div className="container">
        <div className="row">
          <div className="col-12 first-div-home">
            {window.innerHeight > window.innerWidth ? (
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
            ) : (
              <>{/*dca*/}</>
            )}

            {students.map((val, index) => {
              return (
                <div class="alert alert-light outer-box" role="alert">
                  <div class="alert alert-danger" role="alert">
                    <p>
                      <strong>
                        <span class="pull-left">Semester : {val.semester}</span>
                      </strong>
                    </p>
                  </div>
                  <div>
                    <table class="table table-primary table-hover table-striped table-corner">
                      <thead class="table-primary">
                        <tr class="table-primary">
                          <th class="table-primary" scope="col">
                            USN
                          </th>
                          <th>Name</th>
                          <th>Semester</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody class="table-primary table-corner">
                        <tr class="table-primary">
                          <td>{val.usn}</td>
                          <td>{val.name}</td>
                          <td>{val.semester}</td>
                          <td>
                            {
                              <button
                                className="btn btn-outline-dark mt-1 mb-1"
                                data-bs-toggle="modal"
                                data-bs-target={"#exampleModal" + val.sid}
                              >
                                View Details
                              </button>
                            }
                            {
                              <div
                                class="modal fade"
                                id={"exampleModal" + val.sid}
                                tabindex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog modal-dialog-centered">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5
                                        class="modal-title"
                                        id="exampleModalLabel"
                                      >
                                        {val.usn}
                                      </h5>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      <p>Name : {val.name}</p>
                                      <p>Semester : {val.semester}</p>
                                      <p>Email : {val.email}</p>
                                      <p>Gender : {val.gender}</p>
                                      <p>Phone Number : {val.phno}</p>
                                      <p>CGPA : {val.cgpa}</p>
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProctorStudents;
