import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import NavBar from "../NavBar/NavBar";

const cookies = new Cookies();

const get_gp = (grade)=>{
  console.log(grade)
  if(grade === "S")
    return 10
  else if (grade === "A")
    return 9
  else if (grade === "B")
    return 8
  else if (grade === "C")
    return 7
  else if (grade === "D")
    return 6
  else
    return 5
}

const get_sgpas = (marks) => {
  var keys = Object.keys(marks)
  keys.forEach((sem)=> {
    let credits_total = 0
    let sgpa = 0
    marks[sem].forEach((mark)=> {
      var credits = parseInt(mark.credits)
      credits_total += credits
      sgpa += (credits*get_gp(mark.grade))  
      console.log(sgpa)    
    })
    // console.log(`credits in sem ${sem} = ${credits_total}`)
    marks[sem].push(credits_total)
    marks[sem].push(sgpa/credits_total)

  })
}

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
  get_sgpas(marks)
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
              <div className="col-lg-1"></div>
              <div className="col-lg-8 first-div-home">
                <table class="table table-striped">
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
                    {semesters.map((sem, val) => {
                      return (
                        <>
                          <thead>
                            <th scope="col">
                              Semester {sem}
                            </th>
                            <th scope="col">
                              Credits Total {studentMarks[sem][studentMarks[sem].length -2]}
                            </th>
                            <th scope="col">
                              SGPA {studentMarks[sem][studentMarks[sem].length - 1]}
                            </th>
                          </thead>
                          {studentMarks[sem].map((value, index) => {
                            if (value.cid)
                            return (
                              <tr>
                                <th scope="row">-</th>
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
        <>{/*window.location.replace("/")*/}</>
      )}
    </>
  );
};
export default StudentMarks;
