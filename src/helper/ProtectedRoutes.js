import { Route, Redirect } from "react-router-dom";
import * as ROUTES from '../constant'
export default function ProtectedRoutes({
  children,
  ...rest
}) {
  const loggedInName = localStorage.getItem('LoginUser')
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (loggedInName) {
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