import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import UserLogin from "./helper/user_login";
import * as ROUTES from "./constant";
import ProtectedRoutes from "./helper/ProtectedRoutes";
import { useSelector } from "react-redux";
import { selectLoginName } from "./redux/user/LoginSlice";
const App = () => {
  const LoginName = useSelector(selectLoginName);

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
        <Route exact path={ROUTES.AdminPagePath} component={Admin} />
      </Switch>
    </Router>
  );
};

export default App;
