import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { RegisterValidate, RegisterPost } from "../../utils/Authentication/utilsRegister";
import { toast } from "react-toastify";

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setError(RegisterValidate(newUser) || "");
  }, [newUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) return;
    RegisterPost(newUser)
      .then(() => {
        toast.success("Register success");
      })
      .catch(() => {
        toast.error("Register failed");
      });
  };

  return (
    <>
      <div className="p-10 flex flex-col gap-6">
        <div className="">
          {error !== "" ? <div className="text-red-500 mb-1">{error}</div> : <></>}
          <div className="text-3xl">Register</div>
        </div>
        <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>Username</div>
            <input
              type="text"
              placeholder="email"
              className="auth--input"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
          </div>
          <div>
            <div>Password</div>
            <input
              type="password"
              placeholder="password"
              className="auth--input"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </div>
          <div>
            <div>Confirm Password</div>
            <input
              type="password"
              placeholder="password"
              className="auth--input"
              value={newUser.confirmPassword}
              onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
            />
          </div>
          <button type="submit" className="auth--button">
            Register
          </button>
        </form>
        <div>
          <div>
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
