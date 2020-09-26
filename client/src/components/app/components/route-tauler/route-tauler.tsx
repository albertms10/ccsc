import React, { createElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { RootState } from "store/types";
import { linkText } from "utils/strings";

const RouteTauler: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { t } = useTranslation("sign-in");

  const user = useSelector(({ user }: RootState) => user.currentUser);

  const prevLocation = useLocation();

  const renderRoute = useCallback(
    () =>
      user.id_usuari && component ? (
        createElement(component)
      ) : (
        <Redirect
          to={{
            pathname: `/${linkText(t("sign in"))}`,
            state: { prevLocation },
          }}
        />
      ),
    [user.id_usuari, component, prevLocation, t]
  );

  return <Route {...rest} render={renderRoute} />;
};

export default RouteTauler;
