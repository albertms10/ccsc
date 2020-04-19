import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "../../redux/store";

import { HomeApp } from "../home-app";
import { TaulerApp } from "../tauler-app";
import { IniciaSessio } from "../../domain-home/inicia-sessio";

export default () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/inicia-sessio" component={IniciaSessio} />
          <RouteTauler exact path="/tauler" component={TaulerApp} />
          <Route path="*" component={HomeApp} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

const RouteTauler = ({ component, ...rest }) => {
  const user = useSelector((store) => store.user.currentUser);
  const Component = component;
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
            }}
          />
        );
      }}
    />
  );
};
