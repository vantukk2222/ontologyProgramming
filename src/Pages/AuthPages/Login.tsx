import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signIn } from "../../utils/Authentication/utilsSignIn";
import utilsDecodeToken from "../../utils/utilsDecodeToken";
import useAuth from "../../Hooks/useAuth";
import { setHeaderConfigAxios } from "../../Api/AxiosConfig";

import { toast } from "react-toastify";
const Login = () => {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(false);
  }, []);

  const infor = JSON.parse(localStorage.getItem("inforUser") || "{}");

  const [user, setUser] = useState(() => {
    const user = {
      username: infor?.userName || "",
      password: infor?.password || "",
    };
    return user;
  });

  const [checked, setChecked] = useState(() => {
    const password = infor.password || "";
    if (password) {
      console.log(password);
      return true;
    }
    console.log(infor);
    return false;
  });

  useEffect(() => {
    // const currentTime = new Date();
    // const expirationTime = new Date(infor.exp);
    // console.log("expirationTime", infor.exp, currentTime);
    // if (currentTime < expirationTime) {
    // }
    if (infor.exp) {
      // So sánh với thời gian hiện tại
      const checkExpiration = () => {
        const expTime = infor.exp;
        const expTimeParts = expTime.split(" ");
        const expDatePart = expTimeParts[1].split("/");
        const expTimePart = expTimeParts[0].split(":");

        const expDate = new Date(
          expDatePart[2],
          expDatePart[1] - 1,
          expDatePart[0],
          expTimePart[0],
          expTimePart[1]
        );

        const currentTime = new Date();

        if (currentTime < expDate) {
          setIsAuth(true);
          setHeaderConfigAxios(infor.token);
          toast.success(
            `You are logging in with the account: ${infor.userName}!`,
            {
              autoClose: 1000,
            }
          );
          navigate("/");
        }
      };

      checkExpiration();
    }
  }, [infor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(user)
      .then((res) => {
        if (res.status == 200 || res.status == 202) {
          const token = res.data.token;
          setHeaderConfigAxios(token);
          const decode = utilsDecodeToken(token);
          const inforUser = {
            id: decode.id,
            role: decode.roles[0],
            userName: decode.sub,
            token: token,
            password: checked === true ? user.password : "",
            exp: decode.exp,
          };
          localStorage.setItem("inforUser", JSON.stringify(inforUser));
          setIsAuth(true);
          navigate("/");
          toast.success(`Wellcome ${user.username}!`, {
            autoClose: 1000,
          });
        }
      })
      .catch(() => {
        toast.error("Sorry! Login failed");
      });
  };

  return (
    <>
      <div className="p-10 flex flex-col gap-8">
        <div className="text-3xl">Login</div>
        <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>Username</div>
            <input
              type="text"
              placeholder="Username"
              className="auth--input"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            ></input>
          </div>
          <div>
            <div>Password</div>
            <input
              type="password"
              placeholder="Password"
              className="auth--input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            ></input>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                className="auth--checkbox"
                onChange={() => setChecked(!checked)}
                checked={checked}
              ></input>
              <label className="auth--checkbox-label">Remember me</label>
            </div>
            <div>
              <Link to="" className="underline text-blue-500">
                Forgot password
              </Link>
            </div>
          </div>
          <button type="submit" className="auth--button">
            Login
          </button>
        </form>
        <div>
          <div>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
