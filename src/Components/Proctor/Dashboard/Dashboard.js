import NavBar from "../NavBar/NavBar";
import Cookies from "universal-cookie";

import dash from "./dash.js";

const cookies = new Cookies();

const ProctorDashboard = (props) => {
  const googleProfile = props.googleProfile;
  const Token = cookies.get("Token");
  console.log(Token);
  //fetch(`http://localhost:4500/user?gid=${gid}`)
  //  .then((response) => response.json())
  //  .then((data) => {
  //    console.log(data.role);
  //    setData(data);
  //  });
  return (
    <>
      <NavBar googleProfile={googleProfile} />
      <div className="container">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-5 first-div-home">
            <p>
              <span className="home-details-title name">Name : </span>
              <span className="home-details-content name">{dash.name}</span>
            </p>
            <p>
              <span className="home-details-title">USN : </span>
              <span className="home-details-content">{dash.usn}</span>
            </p>
            <p>
              <span className="home-details-title">Email : </span>
              <span className="home-details-content">{dash.email}</span>
            </p>
            <p>
              <span className="home-details-title">Department : </span>
              <span className="home-details-content">{dash.department}</span>
            </p>
            <p>
              <span className="home-details-title">Gender : </span>
              <span className="home-details-content">{dash.gender}</span>
            </p>
          </div>
          <div className="col-lg-5">
            <p>
              <img className="profile-image" src={dash.img}></img>
            </p>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
    </>
  );
};
export default ProctorDashboard;
