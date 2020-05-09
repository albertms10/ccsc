import { MenuOutlined } from "@ant-design/icons";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Layout, Typography } from "antd";
import React, { createContext, useContext, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Agrupacio } from "../../../../domain-tauler/agrupacio";
import { Inici } from "../../../../domain-tauler/inici";
import { Socis } from "../../../../domain-tauler/socis";
import { PerfilSoci } from "../../../../domain-tauler/socis/components/perfil-soci";
import { kebabCase } from "../../../../utils";
import { Authorized } from "../../../authorized";
import { UserDropdown } from "../../../main-sider/components/user-dropdown";
import {
  AgrupacionsListContext,
  LoadingAgrupacionsContext,
} from "../../contexts/agrupacions-context";
import {
  SiderBrokenContext,
  SiderCollapsedContext,
  SiderSetCollapsedContext,
} from "../../contexts/sider-context";
import "./site-layout.css";

const { Content, Header } = Layout;
const { Title } = Typography;

export const SetPageHeaderContext = createContext((_) => {});

export default () => {
  const agrupacions = useContext(AgrupacionsListContext);
  const loadingAgrupacions = useContext(LoadingAgrupacionsContext);
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
      <Layout className={"site-layout" + (scrolled ? " header-scrolled" : "")}>
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
          {broken ? (
            <MenuOutlined
              className="main-sidebar-trigger"
              onClick={() => setCollapsed(false)}
            />
          ) : (
            ""
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
            {loadingAgrupacions
              ? ""
              : agrupacions.map((agrupacio) => (
                  <Route
                    key={agrupacio.id_agrupacio}
                    exact
                    path={"/" + kebabCase(agrupacio.nom_curt)}
                    render={(props) => (
                      <Agrupacio {...props} agrupacio={agrupacio} />
                    )}
                  />
                ))}
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
    </SetPageHeaderContext.Provider>
  );
};
