import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { RootState } from "../../../../store/types";
import { linkText } from "../../../../utils";

const RouteTauler: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { t } = useTranslation("sign-in");

  const user = useSelector(({ user }: RootState) => user.currentUser);

  const prevLocation = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        user.id_usuari ? (
          // TODO: Esbrinar per què es queixa
          // @ts-ignore
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: `/${linkText(t("sign in"))}`,
              state: { prevLocation },
            }}
          />
        )
      }
    />
  );
};

export default RouteTauler;
