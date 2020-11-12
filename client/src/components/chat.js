import React from "react";

function Chat() {
  return (
    <div>
      <h4>
        <div>
          <div className="container">
            <img src="/w3images/bandmember.jpg" alt="Avatar" />
            <h4>Hello. How are you today?</h4>
            <span className="time-right">11:00</span>
          </div>
          <div className="container darker">
            <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" />
            <h4>Hey! I'm fine. Thanks for asking!</h4>
            <span className="time-left">11:01</span>
          </div>
          <div className="container">
            <img src="/w3images/bandmember.jpg" alt="Avatar" />
            <h4>Sweet! So, what do you wanna do today?</h4>
            <span className="time-right">11:02</span>
          </div>
          <div className="container darker">
            <img src="/w3images/avatar_g2.jpg" alt="Avatar" className="right" />
            <h4>Wanna link up and watch the game at Taco Mac?</h4>
            <span className="time-left">11:05</span>
          </div>
        </div>
      </h4>
    </div>
  );
}

export default Chat;
