import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/auth-service";

export const RedirectUserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        if (auth.getCurrentUser()) {
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
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
