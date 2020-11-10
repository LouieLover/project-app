// import React, { Component } from "react";
import React from "react";

function Chat() {
  return (
    <div>
      <h5>Sports Chat</h5>
      <p>
        <div>
          <div className="container">
            <img src="/w3images/bandmember.jpg" alt="Avatar" />
            <p>Hello. How are you today?</p>
            <span className="time-right">11:00</span>
          </div>
          <div className="container darker">
            <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" />
            <p>Hey! I'm fine. Thanks for asking!</p>
            <span className="time-left">11:01</span>
          </div>
          <div className="container">
            <img src="/w3images/bandmember.jpg" alt="Avatar" />
            <p>Sweet! So, what do you wanna do today?</p>
            <span className="time-right">11:02</span>
          </div>
          <div className="container darker">
            <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" />
            <p>Wanna link up and watch the game at Taco Mac?</p>
            <span className="time-left">11:05</span>
          </div>
        </div>
      </p>
    </div>
  );
}

export default Chat;
