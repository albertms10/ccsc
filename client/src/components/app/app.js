import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import caES from 'antd/es/locale/ca_ES';
import moment from 'moment';
import 'moment/locale/ca';

import { MainSider } from '../main-sider';
import { Inici } from '../../domain/inici';
import { Agrupacio } from '../../domain/agrupacio';
import { Socis } from '../../domain/socis';
import { PerfilSoci } from '../../domain/socis/components/perfil-soci';

import useAgrupacions from './hooks/useAgrupacions';
import { kebabCase } from '../../utils';
import './app.css';

moment.locale("ca");
const { Content } = Layout;

export const AgrupacionsContext = createContext(null);
export const LoadingAgrupacionsContext = createContext(null);

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [agrupacions, loadingAgrupacions] = useAgrupacions();

  return (
    <AgrupacionsContext.Provider value={agrupacions}>
      <LoadingAgrupacionsContext.Provider value={loadingAgrupacions}>
        <BrowserRouter basename="/tauler">
          <ConfigProvider locale={caES}>
            <Layout style={{ minHeight: "100vh" }}>
              <MainSider collapsed={collapsed} setCollapsed={setCollapsed} />
              <Layout className="site-layout">
                <Content
                  className="app-layout-content site-layout-background"
                  style={{ marginLeft: collapsed ? 80 : 200 }}
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
                    <Route
                      exact
                      path="/socis/:username"
                      component={PerfilSoci}
                    />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </ConfigProvider>
        </BrowserRouter>
      </LoadingAgrupacionsContext.Provider>
    </AgrupacionsContext.Provider>
  );
};
