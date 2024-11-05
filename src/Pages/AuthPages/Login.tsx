import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { signIn } from "../../utils/Authentication/utilsSignIn";
import useAuth from "../../Hooks/useAuth";

import { toast } from "react-toastify";
import { InforUser } from "../../utils/interface";
import { Loading } from "../../components/Loading/Loading";

const Login = () => {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsAuth(false);
  }, []);

  const infor: InforUser = JSON.parse(localStorage.getItem("inforUser") || "{}");

  const [user, setUser] = useState(() => {
    const user = {
      username: infor?.username || "",
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
    if (infor && infor.message === "Login successful") {

      setIsAuth(true);
      toast.success(
        `You are logging in with the account: ${infor.username}!`,
        {
          autoClose: 1000,
        }
      );
      navigate("/");
    }
  }, [infor]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setIsLoading(true);
    signIn(user)
      .then((res) => {
        if (res.status == 200 || res.status == 202) {
          const data = res.data;
          const inforUser = {
            elementId: data.elementId,
            message: data.message,
            role: data.role,
            username: data.username,
            password: checked ? user.password : "",
          };
          localStorage.setItem("inforUser", JSON.stringify(inforUser));
          setIsAuth(true);
          setIsLoading(false);
          navigate("/");
          toast.success(`Wellcome ${user.username}!`, {
            autoClose: 1000,
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Sorry! Login failed");
      });
  };

  return (
    <>
      <div className="p-10 flex flex-col gap-8">
        {isLoading && <div id="deleteModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <Loading />
        </div>}
        <div className="text-3xl">Đăng nhập</div>
        <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>Tên đăng nhập</div>
            <input
              type="text"
              placeholder="Username"
              className="auth--input"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            ></input>
          </div>
          <div>
            <div>Mật khẩu</div>
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
              <label className="auth--checkbox-label">Lưu tài khoản.</label>
            </div>
          </div>
          <button type="submit" className="auth--button">
            Đăng nhập
          </button>
        </form>

      </div>
    </>
  );
};

export default Login;
