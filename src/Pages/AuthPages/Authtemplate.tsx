import React from "react";
import Login from "./Login";
import Register from "./Register";
import "./css/Authtemplate.css";

interface AuthtemplateProps {
  pages: "login" | "register";
}

const Authtemplate: React.FC<AuthtemplateProps> = (props) => {
  const { pages } = props;
  return (
    <>
      <div className="auth-container">
        <div className="auth-container-item">
          <div className="p-4 auth-container-item-left">
            <div className="auth--title">
              Welcome to <br />
              Education Program Management
            </div>
          </div>
          <div>{pages === "login" ? <Login /> : pages === "register" ? <Register /> : <></>}</div>
        </div>
      </div>
    </>
  );
};


export default Authtemplate;
