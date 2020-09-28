import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/auth-service";

export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = auth.getCurrentUser();
        if (user.role.includes("ROLE_ADMIN")) {
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
