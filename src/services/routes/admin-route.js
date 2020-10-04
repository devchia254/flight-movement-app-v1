import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth/auth-service";

export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // console.log("admin-route: ", props.location);
        const user = auth.getCurrentUser();
        if (user.role.includes("ROLE_ADMIN")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                // location of the component's route that triggers the redirect
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
