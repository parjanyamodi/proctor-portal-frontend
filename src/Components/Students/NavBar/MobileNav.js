import styled from "styled-components";
import Cookies from "universal-cookie";
import { GoogleLogout } from "react-google-login";

const cookies = new Cookies();

const MobileNavigation = (props) => {
  const logout = () => {
    cookies.remove("userInfo", { path: "/" });
    window.location.replace("/");
  };
  return (
    <MobileNav>
      <a href="/student/">
        <span> Dashboard </span>
      </a>
      <a href="/student/marks">
        <span> Marks </span>
      </a>
      <a href="/student/chat">
        <span> Chat </span>
      </a>
      <GoogleLogout
        clientId="365387672860-0nufnftmst8vqpp4l2rlreje9jch3m3c.apps.googleusercontent.com"
        render={(renderProps) => (
          <div className="row mt-5">
            <div className="col-6">
              <button
                className="btn btn-danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        )}
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </MobileNav>
  );
};

const MobileNav = styled.nav`
  @media (min-width: 992px) {
    display: none;
  }
  @media (max-width: 992px) {
    background-color: #ffffff;
    align-items: right;
    display: flex;
    flex-flow: column nowrap;
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 90px;
    padding-top: 5vh;
    height: 100vh;
    width: 100vw;
    a {
      display: flex;
      margin-left: 15%;
      text-decoration: none;
      align-items: center;
      span {
        color: #121212;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.5px;
        line-height: 2;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
      }
      &:hover {
        span {
          color: #7f39fb;
        }
      }
    }
  }
`;

export default MobileNavigation;
