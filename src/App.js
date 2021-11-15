import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import UserLogin from "./helper/user_login";
import * as ROUTES from "./constant";
import ProtectedRoutes from "./helper/ProtectedRoutes";
const App = () => {

  return (
    <Router>
      <Switch>
        <UserLogin
          loggedInPath={ROUTES.MainPagePath}
          path={ROUTES.LoginPagePath}
          exact
        >
          <Login />
        </UserLogin>
        <ProtectedRoutes path={ROUTES.MainPagePath} exact>
          <Main />
        </ProtectedRoutes>
        <ProtectedRoutes path={ROUTES.AdminPagePath} exact>
          <Admin />
        </ProtectedRoutes>
      </Switch>
    </Router>
  );
};

export default App;
