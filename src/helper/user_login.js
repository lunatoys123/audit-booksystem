import { Route, Redirect } from "react-router-dom";

export default function IsUserLoggedin({
  loggedInPath,
  children,
  ...rest
}) {
  const loggedInName = localStorage.getItem('LoginUser');
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!loggedInName) {
          return children;
        }

        if (loggedInName) {
          return (
            <Redirect
              to={{ pathname: loggedInPath, state: { from: location } }}
            />
          );
        }

        return null;
      }}
    ></Route>
  );
}
