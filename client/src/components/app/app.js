import { ConfigProvider } from "antd";
import caES from "antd/es/locale/ca_ES";
import moment from "moment";
import "moment/locale/ca";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IniciaSessio } from "../../pages-home/inicia-sessio";
import { DonarAlta } from "../../pages-home/inicia-sessio/components/donar-alta";
import { DonarAltaFormulari } from "../../pages-home/inicia-sessio/components/donar-alta-formulari";
import { ProteccioDades } from "../../pages-home/inicia-sessio/components/proteccio-dades";
import store from "../../redux/store";
import { HomeApp } from "../home-app";
import { TaulerApp } from "../tauler-app";
import { RouteTauler } from "./components/route-tauler";

moment.locale("ca");

export default () => (
  <Provider store={store}>
    <ConfigProvider locale={caES}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/inicia-sessio" component={IniciaSessio} />
          <Route
            exact
            path="/inicia-sessio/proteccio-dades"
            component={ProteccioDades}
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
  </Provider>
);
