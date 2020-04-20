import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";

import { HomeApp } from "../home-app";
import { TaulerApp } from "../tauler-app";
import { IniciaSessio } from "../../domain-home/inicia-sessio";
import { RouteTauler } from "./components/route-tauler";

export default () => {
  return (
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
};
