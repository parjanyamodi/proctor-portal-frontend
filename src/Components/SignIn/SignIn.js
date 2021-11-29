import styled from "styled-components";
const SignIn = (props) => {
    return (
        <Container>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-12 align-items-center">
                        <Button>
                            <a href="dashboard" class="align-items-center"><span> SignIn with Google </span></a>
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};
const Button = styled.div`
margin-top:50vh;
a {
  color: #ffffff;
  background-color: #ff9d44;
  border-radius: 5px;
  padding: 15px 10px;
  text-align: center;
  transition: 0.5s;
  text-decoration: none;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: #ffffff;
    color: #fd6341;
    font-weight: 600;
  }
}
`;
const Container = styled.div`
    min-height: 100vh;
`;
export default SignIn;