import React, { useState, useEffect } from "react";
import { typeOf } from "react-chat-engine";
import Cookies from "universal-cookie";
import { io } from "socket.io-client";

const cookies = new Cookies();
const socket = io("ws://20.0.2.0:4000");

const ChatComponent = () => {
  const userInfo = cookies.get("userInfo");
  const googleProfile = cookies.get("googleProfile");
  const studentDetail = cookies.get("studentInfo");
  const [message, setMessage] = useState([]);
  const [curMessage, setCurMessage] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit(
        "init",
        {
          googleId: googleProfile.googleId,
          groupId: studentDetail.proctor,
        },
        (value) => {
          setMessage(value);
        }
      );
      console.log(socket.id);
    });

    socket.on("disconnect", () => {
      console.log(socket.id);
    });
    socket.on("hello", (data) => {
      console.log(data);
    });
  });

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
    fetch("http://20.0.2.0:4001/messages", requestOptions).then((res) => {
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
