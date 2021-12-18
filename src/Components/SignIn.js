import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import "./globalVariable";

const clientId =
  "365387672860-0nufnftmst8vqpp4l2rlreje9jch3m3c.apps.googleusercontent.com";
function Login() {
  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    var gid = res.profileObj.googleId;
    global.googId = gid;
    console.log(global.googId);
    fetch(`http://localhost:4500/user?gid=${gid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.role);
        if (data.role === "student") {
          window.location.href = "/student/dashboard";
        }
      });
  };
  const onFailure = (res) => {
    console.log("[Login failed] res: ", res);
  };
  console.log(onSuccess.gid);
  return (
    <div>
      {" "}
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />{" "}
    </div>
  );
}
export default Login;
