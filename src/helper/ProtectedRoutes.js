import { Route, Redirect } from "react-router-dom";
import * as ROUTES from '../constant'
export default function ProtectedRoutes({
  loggedInName,
  children,
  ...rest
}) {
  
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (localStorage.getItem('LoginUser')) {
          return children;
        }

        if (!loggedInName) {
          return (
            <Redirect
              to={{ pathname: ROUTES.LoginPagePath , state: { from: location } }}
            />
          );
        }

        return null;
      }}
    ></Route>
  );
}