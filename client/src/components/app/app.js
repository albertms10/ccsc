import { ConfigProvider } from "antd";
import caES from "antd/es/locale/ca_ES";
import moment from "moment";
import "moment/locale/ca";
import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IniciaSessio } from "../../pages-home/inicia-sessio";
import { DonarAlta } from "../../pages-home/inicia-sessio/components/donar-alta";
import { DonarAltaFormulari } from "../../pages-home/inicia-sessio/components/donar-alta-formulari";
import { AvisosInici } from "../../pages-home/inicia-sessio/components/avisos-inici";
import { store } from "../../store";
import { HomeApp } from "../home-app";
import { TaulerApp } from "../tauler-app";
import { RouteTauler } from "./components/route-tauler";

moment.locale("ca");

export default () => (
  <StoreProvider store={store}>
    <ConfigProvider locale={caES}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/inicia-sessio" component={IniciaSessio} />
          <Route
            exact
            path="/inicia-sessio/avisos"
            component={AvisosInici}
          />
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
    </ConfigProvider>
  </StoreProvider>
);
