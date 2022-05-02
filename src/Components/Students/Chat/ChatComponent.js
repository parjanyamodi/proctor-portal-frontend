import React, { useState, useEffect } from "react";
import { typeOf } from "react-chat-engine";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ChatComponent = () => {
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  const studentDetail = cookies.get("studentInfo");
  const [message, setMessage] = useState([]);
  const [curMessage, setCurMessage] = useState("");

  useEffect(() => {
    fetch(`http://192.168.0.106:4000/messages?pid=${studentDetail.proctor}`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data);
        console.log(data);
      });
  }, []);

  const handleChange = (e) => {
    setCurMessage(e.target.value);
  };
  const sendMessage = () => {
    var today = new Date();
    var date =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: curMessage,
        pid: studentDetail.proctor,
        gid: googleProfile.googleId,
        timestamp: dateTime,
      }),
    };
    fetch("http://192.168.0.106:4000/messages", requestOptions).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="container chatbox-tab">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 ">
          <h2>Chat Box</h2>
          <div className="chatbox">
            {console.log(typeof chat)}
            {console.log(typeof message)}
            {message.map((message) => {
              if (message.sender_id === googleProfile.googleId) {
                return (
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="col-8">
                      <div className="chat-right mb-2">
                        <text className="text-right sender">
                          {message.message}
                        </text>
                        <br />
                        <sup className="text-right text-muted chat-time">
                          {message.timestamp}
                        </sup>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="row">
                    <div className="col-8">
                      <div className="chat-left mb-2">
                        <sub className="text-right text-muted chat-time">
                          {message.sender_id}
                        </sub>
                        <br />
                        <text className="text-left opp-sender">
                          {message.message}
                        </text>
                        <br />
                        <sup className="text-left text-muted chat-time">
                          {message.timestamp}
                        </sup>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="col-2"></div>
      </div>
      <div>
        <input
          type="text"
          placeholder="type your message here"
          value={curMessage}
          onChange={handleChange}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
export default ChatComponent;
