import React, { createContext, useContext, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Inici } from "../../../../domain-tauler/inici";
import { kebabCase } from "../../../../utils";
import { Agrupacio } from "../../../../domain-tauler/agrupacio";
import { Socis } from "../../../../domain-tauler/socis";
import { PerfilSoci } from "../../../../domain-tauler/socis/components/perfil-soci";
import { Layout, Typography } from "antd";

import {
  SiderBrokenContext,
  SiderCollapsedContext,
  SiderSetCollapsedContext,
} from "../../contexts/sider-context";
import {
  AgrupacionsListContext,
  LoadingAgrupacionsContext,
} from "../../contexts/agrupacions-context";

import "./site-layout.css";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { UserDropdown } from "../../../main-sider/components/user-dropdown";
import { Authorized } from "../../../authorized";
import { useAssociacio } from "./hooks";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Content, Header } = Layout;
const { Title } = Typography;

export const SetPageHeaderContext = createContext((_) => {});
export const AssociacioContext = createContext({});

export default () => {
  const agrupacions = useContext(AgrupacionsListContext);
  const loadingAgrupacions = useContext(LoadingAgrupacionsContext);
  const collapsed = useContext(SiderCollapsedContext);
  const setCollapsed = useContext(SiderSetCollapsedContext);
  const broken = useContext(SiderBrokenContext);

  const [associacio] = useAssociacio();
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
      <AssociacioContext.Provider value={associacio}>
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
              width: `calc(100% - ${startInset}px)`,
            }}
          >
            {broken ? (
              collapsed ? (
                <MenuUnfoldOutlined
                  className="trigger"
                  onClick={() => setCollapsed(false)}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger"
                  onClick={() => setCollapsed(true)}
                />
              )
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
      </AssociacioContext.Provider>
    </SetPageHeaderContext.Provider>
  );
};
