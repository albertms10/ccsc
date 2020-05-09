import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IniciaSessio } from "../../pages-home/inicia-sessio";
import { DonarAlta } from "../../pages-home/inicia-sessio/components/donar-alta";
import { DonarAltaFormulari } from "../../pages-home/inicia-sessio/components/donar-alta-formulari";
import store from "../../redux/store";
import { HomeApp } from "../home-app";
import { TaulerApp } from "../tauler-app";
import { RouteTauler } from "./components/route-tauler";

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/inicia-sessio" component={IniciaSessio} />
        <Route exact path="/donar-alta" component={DonarAlta} />
        <Route
          exact
          path="/donar-alta/formulari"
          component={DonarAltaFormulari}
        />
        <RouteTauler path="/tauler" component={TaulerApp} />
        <Route path="/" component={HomeApp} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
