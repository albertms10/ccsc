import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { RootState } from "../../../../store/types";

const RouteTauler: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const user = useSelector(({ user }: RootState) => user.currentUser);

  const prevLocation = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        user.hasOwnProperty("id") ? (
          // TODO: Esbrinar per què es queixa
          // @ts-ignore
          <Component />
        ) : (
          <Redirect
            to={{ pathname: "/inicia-sessio", state: { prevLocation } }}
          />
        )
      }
    />
  );
};

export default RouteTauler;
