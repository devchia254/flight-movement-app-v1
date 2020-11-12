import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth/auth-service";

// Only Admin has access to this route
export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = auth.getCurrentUser();
        // If there is a User and his/her role is an Admin
        if (user && user.role.includes("ROLE_ADMIN")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                // Redirect to pathname if accessing Admin Route illegitmately
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
