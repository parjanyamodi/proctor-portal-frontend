import NavBar from "../NavBar/NavBar";
import {ChatEngine} from "react-chat-engine"

const Chat = () => {
  return (
    <>
      {" "}
      <NavBar />
      <ChatEngine
      height="80vh"
      projectID="8c1e8a7e-17ab-48a7-8220-b03d8e983494"
      userName="Vijayeshjeevan (Proctor)"
      userSecret="Vijayeshjeevan (Proctor)"
      />
    </>
  );
};

export default Chat;
