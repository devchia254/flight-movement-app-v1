import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/auth/auth-service";

// Any and only user can access this route
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // If there is a User
        if (auth.getCurrentUser()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
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
