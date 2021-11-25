import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import UserLogin from "./helper/user_login";
import Book from "./Pages/Book";
import Employee from "./Pages/ForEmployee"
import * as ROUTES from "./constant";
import ProtectedRoutes from "./helper/ProtectedRoutes";

const App = () => {
  window.addEventListener("beforeunload", () => {
    localStorage.clear();
  });
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
        <ProtectedRoutes path={ROUTES.BookPagePath} exact>
          <Book />
        </ProtectedRoutes>
        <Route  path={ROUTES.EmployeePagePath} component={Employee} exact />
      </Switch>
    </Router>
  );
};

export default App;
