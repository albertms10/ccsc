import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import React from "react";

export default ({ component, ...rest }) => {
  const user = useSelector((store) => store.user.currentUser);
  const Component = component;
  const prevLocation = useLocation();

  return (
    <Route
      {...rest}
      render={() => {
        return user.hasOwnProperty("id") ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/inicia-sessio",
              state: { prevLocation },
            }}
          />
        );
      }}
    />
  );
};
