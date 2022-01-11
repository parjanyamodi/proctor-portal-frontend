import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const clientId =
  "365387672860-0nufnftmst8vqpp4l2rlreje9jch3m3c.apps.googleusercontent.com";

function Login() {
  const [gId, setGId] = useState("");
  const [data, setData] = useState("");

  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    setGId(res.profileObj.googleId);
    fetch(`http://localhost:4500/user?gid=${res.profileObj.googleId}`)
      .then((response) => response.json())
      .then((data) => {
        const obj = `{ "googleId": "${data.gid}", "role": "${data.role}" }`;
        cookies.set("userInfo", obj, {
          path: "/",
        });
        cookies.set("googleProfile", res.profileObj, {
          path: "/",
        });
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
          render={(renderProps) => (
            <button
              className="btn btn-primary"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <strong>Login with Google</strong>
            </button>
          )}
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
      ) : data.role === "Proctor" ? (
        window.location.replace("/proctor/")
      ) : (
        <></>
      )}
    </div>
  );
}
export default Login;
