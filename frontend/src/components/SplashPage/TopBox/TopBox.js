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
        <h2 id="body-text">Discover more with NoiseNimbus Go+</h2>
        <p id="p-text">NoiseNimbus Go+ lets you listen offline, ad-free, with over 150 million
          tracks — and growing.</p>
      </div>
    </div>
  );
}

export default TopBox;
