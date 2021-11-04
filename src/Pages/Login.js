import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constant";
import ErrorMessage from "../component/ErrorMessage";
import { GetLoginName, selectLoginState } from "../redux/user/userslice";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const LoginState = useSelector(selectLoginState);

  useEffect(()=>{
    if(LoginState==='failed'){
      setError((error)=>error='Wrong username or password');
    }else if(LoginState==='Success'){
      history.push(ROUTES.MainPagePath);
    }
  },[LoginState, history]);
  const LoginUser = (e) => {
    e.preventDefault();
    dispatch(GetLoginName({ username, password }));

    console.log(LoginState)
    // axios
    //   .get("http://localhost:3001/login", {
    //     params: { username, password },
    //   })
    //   .then((response) => {
    //     if (response.data.num > 0) {
    //       localStorage.setItem("LoginUser", response.data.uname);
    //       history.push(ROUTES.MainPagePath);
    //     } else {
    //       setError("Wrong username or password");
    //     }
    //   })
    //   .catch((response) => {
    //     console.log(response);
    //   });
  };
  return (
    <div className="bg-white w-screen h-screen flex flex-col">
      {error && <ErrorMessage error={error} setError={setError} />}
      <div className="bg-gray-200 bg-opacity-50 m-auto items-center w-2/6 h-auto rounded-2xl shadow-lg">
        <div className="flex flex-col w-4/5 h-auto justify-center mx-auto">
          <p className="flex justify-center text-3xl font-medium m-3 text-center">
            Audit Commission Book System
          </p>
          <div className="w-auto mx-auto text-center">
            <form onSubmit={LoginUser}>
              <input
                type="text"
                aria-label="Please enter your username"
                placeholder="username"
                className="text-sm text-grey-base w-4/5 m-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                value={username}
              />
              <input
                type="password"
                placeholder="password"
                aria-label="Please enter your password"
                className="text-sm text-grey-base w-4/5 m-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
              <div className="flex flex-col justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 w-1/2 text-white p-2 rounded mx-auto m-3 hover:bg-red-400 transition duration-300 ease-in-out"
                >
                  Admin Login
                </button>
                <p className="mb-3 font-normal">Not An Admin? press here</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
