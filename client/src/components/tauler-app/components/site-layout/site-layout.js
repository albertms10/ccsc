import React, { useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Inici } from "../../../../domain-tauler/inici";
import { kebabCase } from "../../../../utils";
import { Agrupacio } from "../../../../domain-tauler/agrupacio";
import { Socis } from "../../../../domain-tauler/socis";
import { PerfilSoci } from "../../../../domain-tauler/socis/components/perfil-soci";
import { Layout, Typography } from "antd";

import {
  SiderBrokenContext,
  SiderCollapsedContext,
} from "../../contexts/sider-context";
import {
  AgrupacionsListContext,
  LoadingAgrupacionsContext,
} from "../../contexts/agrupacions-context";

import "./site-layout.css";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const { Content, Header } = Layout;
const { Title } = Typography;

export default () => {
  const agrupacions = useContext(AgrupacionsListContext);
  const loadingAgrupacions = useContext(LoadingAgrupacionsContext);
  const collapsed = useContext(SiderCollapsedContext);
  const broken = useContext(SiderBrokenContext);

  const [scrolled, setScrolled] = useState(false);
  const [pageHeader, setPageHeader] = useState("");

  useScrollPosition(({ _, currPos }) => {
    if (currPos.y < -15) setScrolled(true);
    else setScrolled(false);
  });

  return (
    <Layout className="site-layout">
      <Header
        className={
          "site-layout-background app-layout-header" +
          (scrolled ? " scrolled" : "")
        }
        style={{ marginLeft: broken ? 0 : collapsed ? 80 : 200 }}
      >
        <Title
          className={"app-layout-header-title" + (scrolled ? " scrolled" : "")}
          level={4}
        >
          {pageHeader}
        </Title>
      </Header>
      <Content
        className="app-layout-content site-layout-background"
        style={{ marginLeft: broken ? 0 : collapsed ? 80 : 200 }}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              setPageHeader("Inici");
              return <Inici />;
            }}
          />
          {loadingAgrupacions
            ? ""
            : agrupacions.map((agrupacio) => (
                <Route
                  key={agrupacio.id_agrupacio}
                  exact
                  path={"/" + kebabCase(agrupacio.nom_curt)}
                  render={(props) => {
                    setPageHeader(agrupacio.nom);
                    return <Agrupacio {...props} agrupacio={agrupacio} />;
                  }}
                />
              ))}
          <Route
            exact
            path="/socis"
            render={() => {
              setPageHeader("Socis");
              return <Socis />;
            }}
          />
          <Route
            exact
            path="/socis/:id"
            render={() => {
              setPageHeader("Soci");
              return <PerfilSoci />;
            }}
          />
        </Switch>
      </Content>
    </Layout>
  );
};
