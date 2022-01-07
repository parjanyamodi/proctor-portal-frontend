import styled from "styled-components";

const MobileNavigation = (props) => {
  return (
    <MobileNav>
      <a href="/home">
        <span> Home </span>
      </a>
      <a href="/portfolio">
        <span> Portfolio </span>
      </a>
      <a href="/contactme">
        <span> Contact Me </span>
      </a>
      <a href="/logout">
        <span className="logout">Logout</span>
      </a>
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
