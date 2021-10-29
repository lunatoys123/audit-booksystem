import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import * as ROUTES from "./constant";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HomePagePath} component={Login} />
        <Route exact path={ROUTES.MainPagePath} component={Main} />
      </Switch>
    </Router>
  );
};

export default App;
