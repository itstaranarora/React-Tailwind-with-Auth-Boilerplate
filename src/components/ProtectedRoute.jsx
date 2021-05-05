import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "hooks/useAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
