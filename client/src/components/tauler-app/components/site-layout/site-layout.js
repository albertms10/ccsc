import { MenuOutlined } from "@ant-design/icons";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Layout, Typography } from "antd";
import React, { createContext, useContext, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Formacio from "../../../../pages-tauler/formacio/formacio";
import { Assajos } from "../../../../pages-tauler/assajos";
import { DetallAssaig } from "../../../../pages-tauler/detall-assaig";
import { DetallObres } from "../../../../pages-tauler/detall-obres";
import { DetallProjecte } from "../../../../pages-tauler/detall-projecte";
import { Inici } from "../../../../pages-tauler/inici";
import { Obres } from "../../../../pages-tauler/obres";
import { PerfilSoci } from "../../../../pages-tauler/perfil-soci";
import { Projectes } from "../../../../pages-tauler/projectes";
import { Socis } from "../../../../pages-tauler/socis";
import { ErrorBoundary } from "../../../../standalone/error-boundary";
import { kebabCase } from "../../../../utils";
import { Authorized } from "../../../authorized";
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

export const SetPageHeaderContext = createContext((_) => {});

export default () => {
  const formacions = useContext(FormacionsListContext);
  const loadingFormacions = useContext(LoadingFormacionsContext);
  const collapsed = useContext(SiderCollapsedContext);
  const setCollapsed = useContext(SiderSetCollapsedContext);
  const broken = useContext(SiderBrokenContext);

  const [scrolled, setScrolled] = useState(false);
  const [pageHeader, setPageHeader] = useState("");
  const location = useLocation();

  useScrollPosition(({ _, currPos }) => {
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
            <Switch>
              <Route exact path="/" component={Inici} />
              {!loadingFormacions &&
                formacions.map((formacio) => (
                  <Route
                    key={formacio.id_formacio}
                    exact
                    path={"/" + kebabCase(formacio.nom_curt)}
                    render={(props) => (
                      <Formacio {...props} formacio={formacio} />
                    )}
                  />
                ))}
              <Route exact path="/projectes" component={Projectes} />
              <Route exact path="/projectes/:id" component={DetallProjecte} />
              <Route exact path="/assajos" component={Assajos} />
              <Route exact path="/assajos/:id" component={DetallAssaig} />
              <Route exact path="/obres" component={Obres} />
              <Route exact path="/obres/:id" component={DetallObres} />
              <Route
                exact
                path="/socis"
                render={() => (
                  <Authorized>
                    <Socis />
                  </Authorized>
                )}
              />
              <Route exact path="/socis/:id" component={PerfilSoci} />
            </Switch>
          </Content>
        </Layout>
      </ErrorBoundary>
    </SetPageHeaderContext.Provider>
  );
};
