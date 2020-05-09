import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IniciaSessio } from "../../domain-home/inicia-sessio";
import store from "../../redux/store";
import { HomeApp } from "../home-app";
import { TaulerApp } from "../tauler-app";
import { RouteTauler } from "./components/route-tauler";

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/inicia-sessio" component={IniciaSessio} />
        <RouteTauler path="/tauler" component={TaulerApp} />
        <Route path="/" component={HomeApp} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
