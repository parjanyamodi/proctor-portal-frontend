import styled from "styled-components";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import MobileNavigation from "./MobileNav";
import ProctorDashboard from "../Dashboard/Dashboard";
import { useState } from "react";

const NavBar = (props) => {
  const googleProfile = props.googleProfile;
  const [open, setOpen] = useState(false);
  const closeIcon = (
    <IoClose size="40px" color="#121212" onClick={() => setOpen(!open)} />
  );
  const openIcon = (
    <HiOutlineMenuAlt3
      size="40px"
      color="#121212"
      onClick={() => setOpen(!open)}
    />
  );

  return (
    <>
      <Nav>
        <Logo className="text-align-text align-items-center justify-content-center">
          <a href="/home">
            <img src="/assets/images/logo.png" alt="Parjanya Modi" />
          </a>
        </Logo>
        <NavMenu>
          <span onClick={<ProctorDashboard googleProfile={googleProfile} />}>
            <span> Dashboard </span>
          </span>
          <a href="/student/marks">
            <span> Marks </span>
          </a>
          <a href="/student/chat">
            <span> Chat </span>
          </a>
          <a href="/logout">
            <span className="logout">Logout</span>
          </a>
        </NavMenu>
        <MobiNav>
          {open ? closeIcon : openIcon}
          {open && <MobileNavigation />}
        </MobiNav>
      </Nav>
      <hr className="seprator" />
    </>
  );
};
const MobiNav = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
`;
const Nav = styled.nav`
  @media (min-width: 992px) {
    padding: 0 8% 0;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
  }
  @media (max-width: 992px) {
    padding: 0 5% 0;
    position: relative;
    flex-flow: row nowrap;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
  }
`;

const Logo = styled.div`
  @media (min-width: 992px) {
    padding: 0;
    width: 150px;
    margin-top: 4px;
    margin-bottom: 4px;
    max-height: 70px;
    font-size: 0;
    display: flex;
    flex-flow: row nowrap;
    img {
      display: flex;
      width: 250px;
    }
  }
  @media (max-width: 992px) {
    padding: 0;
    width: 120px;
    margin-top: 4px;
    margin-bottom: 4px;
    max-height: 70px;
    font-size: 0;
    display: flex;
    flex-flow: row nowrap;
    img {
      display: flex;
      width: 100%;
    }
  }
`;

const NavMenu = styled.div`
  @media (min-width: 992px) {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: 0px;
    margin-left: 25px;
    span {
      display: flex;
      text-decoration: none;
      align-items: center;
      padding: 0 12px;
      span {
        color: #121212;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.5px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
        transition: 0.3s;
      }
      &:hover {
        span {
          color: #7f39fb;
        }
      }
    }
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

export default NavBar;