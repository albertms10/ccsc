import { Route, Switch } from "react-router-dom";
import { Inici } from "../../../../domain-tauler/inici";
import { kebabCase } from "../../../../utils";
import { Agrupacio } from "../../../../domain-tauler/agrupacio";
import { Socis } from "../../../../domain-tauler/socis";
import { PerfilSoci } from "../../../../domain-tauler/socis/components/perfil-soci";
import { Layout } from "antd";
import React, { useContext } from "react";

import {
  SiderBrokenContext,
  SiderCollapsedContext,
} from "../../contexts/sider-context";
import {
  AgrupacionsListContext,
  LoadingAgrupacionsContext,
} from "../../contexts/agrupacions-context";

import "./site-layout.css";

const { Content, Header } = Layout;

export default () => {
  const agrupacions = useContext(AgrupacionsListContext);
  const loadingAgrupacions = useContext(LoadingAgrupacionsContext);
  const collapsed = useContext(SiderCollapsedContext);
  const broken = useContext(SiderBrokenContext);

  return (
    <Layout className="site-layout">
      <Header className="site-layout-background app-layout-header" />
      <Content
        className="app-layout-content site-layout-background"
        style={{ marginLeft: broken ? 0 : collapsed ? 80 : 200 }}
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
          <Route exact path="/socis" component={Socis} />
          <Route exact path="/socis/:id" component={PerfilSoci} />
        </Switch>
      </Content>
    </Layout>
  );
};
