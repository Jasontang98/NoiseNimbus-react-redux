import React from "react";
import LoginFormModal from "./LoginFormModal/LoginModal";
import SignupFormModal from "./SignupFormModal/SignupModal";

function TopBox() {
  return (
    <div className="topImageContainer">
      <div className="navButtons">
        <LoginFormModal />
        <SignupFormModal />
      </div>
      <div>
        <h2 className="Title">NoiseNimbus</h2>
      </div>
      <div>
        <h2 id="body-text">Discover more with NoiseNimbus ultra.</h2>
        <p id="p-text">NoiseNimbus ultra lets you listen offline and ad-free.</p>
      </div>
    </div>
  );
}

export default TopBox;
