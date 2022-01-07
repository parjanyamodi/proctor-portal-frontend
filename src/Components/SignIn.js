import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";

import ProctorDashboard from "./Proctor/Dashboard/Dashboard";

const cookies = new Cookies();

const clientId =
  "365387672860-0nufnftmst8vqpp4l2rlreje9jch3m3c.apps.googleusercontent.com";
function Login() {
  const [gId, setGId] = useState("");
  const [googleProfile, setGoogleProfile] = useState("");
  const [data, setData] = useState("");

  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    var gid = res.profileObj.googleId;
    var gpp = res.profileObj;
    setGId(gid);
    setGoogleProfile(res.profileObj);
    fetch(`http://localhost:4500/user?gid=${res.profileObj.googleId}`)
      .then((response) => response.json())
      .then((data) => {
        const obj = `{ "googleId": ${gid}, "role": ${data.role} }`;
        cookies.set("Token", obj, {
          path: "/",
        });
        cookies.set("GoogleProfile", gpp, {
          path: "/",
        });
        if (data.role === "student") {
          fetch(`http://localhost:4500/student?sid=${gid}`)
            .then((response) => response.json())
            .then((data) => {
              fetch(`http://localhost:4500/student/marks?usn=${data.usn}`)
                .then((respons) => respons.json())
                .then((dat) => {
                  cookies.set("studentMarks", dat, { path: "/" });
                });
              cookies.set("studentDetails", data, {
                path: "/",
              });
            });
        }

        setData(data);
      });
  };
  const onFailure = (res) => {
    console.log("[Login failed] res: ", res);
  };
  return (
    <div>
      {gId === "" ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
          isSignedIn={true}
        />
      ) : (
        <></>
      )}
      {data.role === "student" ? (
        window.location.replace("/student/")
      ) : data.role === "proctor" ? (
        window.location.replace("/proctor/")
      ) : (
        <></>
      )}
    </div>
  );
}
export default Login;
