import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth/auth-service";

export const RedirectUserRoute = ({ render: Component, ...rest }) => {
  // console.log({ ...rest });
  return (
    <Route
      {...rest}
      render={(props) => {
        // console.log("redirectuser-route: ", props.location);
        if (auth.getCurrentUser()) {
          return (
            <Redirect
              to={{
                pathname: "/",
                // gets location of the current route of the component (to redirect from)
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
