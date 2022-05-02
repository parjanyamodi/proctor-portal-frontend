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
    fetch(`http://192.168.0.106:4500/user?gid=${res.profileObj.googleId}`)
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
        <div className="container login-app">
          <div className="row mt-5">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 mt-5">
              <div class="card card-size">
                <img
                  src="/assets/bmsce_logo.jpeg"
                  class="card-img-top logo-css"
                  alt="..."
                />
                <hr />
                <img
                  src="/assets/ae5ae16a1f8bdad663c96a699d91e646.jpeg"
                  class="card-img-top logo-css"
                  alt="..."
                />
                <hr />
                <div class="card-body">
                  <h3>BMSCE Proctor Portal</h3>
                  <p>Login with your College ID and Enjoy!</p>
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
                </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
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
