import { ConfigProvider } from "antd";
import caES from "antd/es/locale/ca_ES";
import { TaulerApp } from "components/tauler-app";
import dayjs from "dayjs";
import "dayjs/locale/ca";
import { IniciaSessio } from "pages/home/inicia-sessio";
import { AvisosInici } from "pages/home/inicia-sessio/components/avisos-inici";
import { DonarAlta } from "pages/home/inicia-sessio/components/donar-alta";
import { DonarAltaFormulari } from "pages/home/inicia-sessio/components/donar-alta-formulari";
import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CenteredSpin } from "standalone/centered-spin";
import { store } from "store";
import { linkText } from "utils/strings";
import { RouteTauler } from "./components/route-tauler";

const HomeApp = lazy(
  () =>
    import("components/home-app/home-app" /* webpackChunkName: "home-app" */)
);

dayjs.locale("ca");

const App: React.FC = () => {
  const { t } = useTranslation("sign-in");

  return (
    <StoreProvider store={store}>
      <ConfigProvider locale={caES}>
        <BrowserRouter>
          <Suspense fallback={<CenteredSpin />}>
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
                path={`/${linkText(t("dashboard:dashboard"))}`}
                component={TaulerApp}
              />
              <Route path="/" component={HomeApp} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </StoreProvider>
  );
};

export default App;
