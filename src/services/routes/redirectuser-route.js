import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth/auth-service";

// Users are not allowed to access this route hence, redirected
export const RedirectUserRoute = ({ render: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.getCurrentUser()) {
          return (
            <Redirect
              to={{
                pathname: "/",
                // 'state' triggers redirect when user try to access this route / component
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Route {...rest} render={Component} />;
        }
      }}
    />
  );
};
