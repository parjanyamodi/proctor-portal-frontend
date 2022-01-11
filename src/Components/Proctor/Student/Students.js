import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProctorStudents = () => {
  const processStudents = (students)=> {
    var semesters = semester
    students.map((val)=>{
      if(!semesters.includes(val.semester))
        semesters.push(val.semester)
    })
    setSemester(semester)
    return
  }
  const [semester, setSemester] = useState([])
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  console.log(userInfo)
  const [students, setStudents] = useState([])
  const [selection, setSelection] = useState("All")
  useEffect(() => {
    fetch(`http://localhost:4500/proctor/students?pid=${userInfo.googleId}`)
    .then((res) => res.json())
    .then((data)=> {
      console.log(data)
      processStudents(data)
      setStudents(data)
    })
  }, [])

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
            
             <div class="alert alert-light outer-box" role="alert">
                  <div class="alert alert-danger" role="alert">
                    <p>
                      <strong>
                        <span class="pull-left">Semester </span>

                        <span class="pull-right">
                          SGPA :
                          
                        </span>
                        <span class="pull-right">
                          Total Credits :
                          
                          &emsp;&emsp;&emsp;&emsp;
                        </span>
                      </strong>
                    </p>
                  </div>
                  <div>
                  {
                    semester.map((val, index)=> {
                      return (<button type="button" onClick={()=>setSelection(val)}>Semester {val}</button>)
                    })
                  }
                  <button type="button" onClick={()=>setSelection("All")}>All</button>
                  </div>
                  <table class="table table-danger table-hover table-striped table-corner">
                    <thead class="table-danger">
                      <tr class="table-danger">
                        <th class="table-danger" scope="col">
                          #
                        </th>
                        <th>
                          Name
                        </th>
                        <th>
                          Semester
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((val, index)=> {
                        if(val.semester === selection | selection === "All")
                        return (
                          <>
                          <td>
                            {index+1}
                          </td>
                          <td>
                            {val.name}
                          </td>
                          <td>
                            {val.semester}
                          </td>
                          </>
                        )
                      })

                      }
                    </tbody>
                  </table>
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProctorStudents;
