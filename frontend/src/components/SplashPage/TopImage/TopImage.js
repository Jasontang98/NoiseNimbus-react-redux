import React from "react";
import LoginFormModal from "./SigninModal";
import CreateAccountModal from "./CreateAccountModal";
import './TopImage.css'

function TopImage() {
  return (
    <div className="topImageContainer">
      <div className="navButtons">
        <LoginFormModal />
        <CreateAccountModal />
      </div>
      </div>
  );
}

export default TopImage;
