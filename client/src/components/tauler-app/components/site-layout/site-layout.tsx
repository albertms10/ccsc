import { MenuOutlined } from "@ant-design/icons";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Layout, Typography } from "antd";
import { Authorized } from "components/authorized";
import React, {
  createContext,
  lazy,
  Suspense,
  useContext,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useLocation } from "react-router-dom";
import { CenteredSpin } from "standalone/centered-spin";
import { ErrorBoundary } from "standalone/error-boundary";
import { PageNotFound } from "standalone/page-not-found";
import { linkText } from "utils/strings";
import {
  FormacionsListContext,
  LoadingFormacionsContext,
} from "../../contexts/formacions-context";
import {
  SiderBrokenContext,
  SiderCollapsedContext,
  SiderSetCollapsedContext,
} from "../../contexts/sider-context";
import { UserDropdown } from "../user-dropdown";
import "./site-layout.css";

const { Content, Header } = Layout;
const { Title } = Typography;

const Assajos = lazy(
  () => import("pages/tauler/assajos/assajos" /* webpackChunkName: "assajos" */)
);
const DetallAssaig = lazy(
  () =>
    import(
      "pages/tauler/detall-assaig/detall-assaig" /* webpackChunkName: "detall-assaig" */
    )
);
const DetallFormacio = lazy(
  () =>
    import(
      "pages/tauler/detall-formacio/detall-formacio" /* webpackChunkName: "detall-formacio" */
    )
);
const DetallMoviment = lazy(
  () =>
    import(
      "pages/tauler/detall-moviment/detall-moviment" /* webpackChunkName: "detall-moviment" */
    )
);
const DetallObra = lazy(
  () =>
    import(
      "pages/tauler/detall-obra/detall-obra" /* webpackChunkName: "detall-obra" */
    )
);
const DetallProjecte = lazy(
  () =>
    import(
      "pages/tauler/detall-projecte/detall-projecte" /* webpackChunkName: "detall-projecte" */
    )
);
const IniciPage = lazy(
  () =>
    import(
      "pages/tauler/inici-page/inici-page" /* webpackChunkName: "inici-page" */
    )
);
const Obres = lazy(
  () => import("pages/tauler/obres/obres" /* webpackChunkName: "obres" */)
);
const PerfilSoci = lazy(
  () =>
    import(
      "pages/tauler/perfil-soci/perfil-soci" /* webpackChunkName: "perfil-soci" */
    )
);
const Projectes = lazy(
  () =>
    import(
      "pages/tauler/projectes/projectes" /* webpackChunkName: "projectes" */
    )
);
const Socis = lazy(
  () => import("pages/tauler/socis/socis" /* webpackChunkName: "socis" */)
);

export const SetPageHeaderContext = createContext<
  React.Dispatch<React.SetStateAction<string>>
>(/* TODO: Default callable value */ (_) => {});

const SiteLayout: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const formacions = useContext(FormacionsListContext);
  const loadingFormacions = useContext(LoadingFormacionsContext);
  const collapsed = useContext(SiderCollapsedContext);
  const setCollapsed = useContext(SiderSetCollapsedContext);
  const broken = useContext(SiderBrokenContext);

  const [scrolled, setScrolled] = useState(false);
  const [pageHeader, setPageHeader] = useState("");

  const location = useLocation();

  useScrollPosition(({ currPos }) => {
    if (currPos.y < -41) setScrolled(true);
    else setScrolled(false);
  });

  const startInset = broken ? 0 : collapsed ? 80 : 200;

  return (
    <SetPageHeaderContext.Provider value={setPageHeader}>
      <ErrorBoundary>
        <Layout
          className={"site-layout" + (scrolled ? " header-scrolled" : "")}
        >
          <Header
            className={
              "site-layout-background app-layout-header" +
              (location.pathname === "/" ? " ghost" : "")
            }
            style={{
              marginInlineStart: startInset,
              width: `calc(100vw - ${startInset}px)`,
              transition: "all 0.2s ease",
            }}
          >
            {broken && (
              <MenuOutlined
                className="main-sidebar-trigger"
                onClick={() => setCollapsed(false)}
              />
            )}
            <Title className="app-layout-header-title" level={4}>
              {pageHeader}
            </Title>
            <UserDropdown />
          </Header>
          <Content
            className="app-layout-content site-layout-background"
            style={{ marginInlineStart: startInset }}
          >
            <Suspense fallback={<CenteredSpin />}>
              <Switch>
                <Route exact path="/" component={IniciPage} />
                {!loadingFormacions &&
                  formacions.map((formacio) => (
                    <Route
                      key={formacio.id_formacio}
                      exact
                      path={`/${linkText(formacio.nom_curt)}`}
                      render={(props) => (
                        <DetallFormacio {...props} formacio={formacio} />
                      )}
                    />
                  ))}
                <Route
                  exact
                  path={`/${linkText(t("projects"))}`}
                  component={Projectes}
                />
                <Route
                  path={`/${linkText(t("projects"))}/:id`}
                  component={DetallProjecte}
                />
                <Route
                  exact
                  path={`/${linkText(t("rehearsals"))}`}
                  component={Assajos}
                />
                <Route
                  exact
                  path={`/${linkText(t("rehearsals"))}/:id`}
                  component={DetallAssaig}
                />
                <Route
                  exact
                  path={`/${linkText(t("works"))}`}
                  component={Obres}
                />
                <Route
                  exact
                  path={`/${linkText(t("works"))}/:id`}
                  component={DetallObra}
                />
                <Route
                  exact
                  path={`/${linkText(t("works"))}/:obra/${linkText(
                    t("movements")
                  )}/:moviment`}
                  component={DetallMoviment}
                />
                <Route
                  exact
                  path={`/${linkText(t("partners"))}`}
                  render={() => (
                    <Authorized elseElement={<PageNotFound />}>
                      <Socis />
                    </Authorized>
                  )}
                />
                <Route
                  exact
                  path={`/${linkText(t("partners"))}/:id`}
                  component={PerfilSoci}
                />
                <Route component={PageNotFound} />
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </ErrorBoundary>
    </SetPageHeaderContext.Provider>
  );
};

export default SiteLayout;
