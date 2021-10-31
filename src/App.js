import React, {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import UserLogin from "./helper/user_login";
import * as ROUTES from "./constant";
import ProtectedRoutes from "./helper/ProtectedRoutes";
const App = () => {
  const LoginName = localStorage.getItem("LoginUser");

  const removeLocalCache = () =>{
    localStorage.clear();
  }
  useEffect(()=>{
    window.addEventListener('unload', removeLocalCache);
  })

  return (
    <Router>
      <Switch>
        <UserLogin
          loggedInName={LoginName}
          loggedInPath={ROUTES.MainPagePath}
          path={ROUTES.LoginPagePath}
          exact
        >
          <Login />
        </UserLogin>
        <ProtectedRoutes
          loggedInName={LoginName}
          path={ROUTES.MainPagePath}
          exact
        >
          <Main />
        </ProtectedRoutes>
      </Switch>
    </Router>
  );
};

export default App;
