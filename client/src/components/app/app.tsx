import { ConfigProvider } from "antd";
import caES from "antd/es/locale/ca_ES";
import { HomeApp } from "components/home-app";
import { TaulerApp } from "components/tauler-app";
import moment from "moment";
import "moment/locale/ca";
import { IniciaSessio } from "pages-home/inicia-sessio";
import { AvisosInici } from "pages-home/inicia-sessio/components/avisos-inici";
import { DonarAlta } from "pages-home/inicia-sessio/components/donar-alta";
import { DonarAltaFormulari } from "pages-home/inicia-sessio/components/donar-alta-formulari";
import React from "react";
import { useTranslation } from "react-i18next";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { store } from "store";
import { linkText } from "utils";
import { RouteTauler } from "./components/route-tauler";

moment.locale("ca");

const App: React.FC = () => {
  const { t } = useTranslation("sign-in");

  return (
    <StoreProvider store={store}>
      <ConfigProvider locale={caES}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={`/${linkText(t("sign in"))}`}
              component={IniciaSessio}
            />
            <Route
              exact
              path={`/${linkText(t("sign in"))}/${linkText(t("notices"))}`}
              component={AvisosInici}
            />
            <Route
              exact
              path={`/${linkText(t("sign up short"))}`}
              component={DonarAlta}
            />
            <Route
              exact
              path={`/${linkText(t("sign up short"))}/${linkText(t("form"))}`}
              component={DonarAltaFormulari}
            />
            <RouteTauler
              path={`/${linkText(t("dashboard"))}`}
              component={TaulerApp}
            />
            <Route path="/" component={HomeApp} />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </StoreProvider>
  );
};

export default App;
