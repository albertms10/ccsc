import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import caES from 'antd/es/locale/ca_ES';
import moment from 'moment';
import 'moment/locale/ca';
import MainSider from './MainSider/MainSider';
import IniciPage from '../pages/Inici/IniciPage';
import Agrupacio from '../pages/Agrupacio/Agrupacio';
import SocisPage from '../pages/Socis/SocisPage';
import PerfilSociPage from '../pages/Socis/PerfilSociPage';

import './styles.css';
import { kebabCase } from '../utils/utils';

moment.locale('ca');

const { Header, Content, Footer } = Layout;

export const AgrupacionsContext = createContext(null);
export const LoadingAgrupacionsContext = createContext(null);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [agrupacions, setAgrupacions] = useState([]);
  const [loadingAgrupacions, setLoadingAgrupacions] = useState(false);

  useEffect(() => {
    setLoadingAgrupacions(true);

    fetch('/api/associacio/agrupacions')
      .then(res => res.json())
      .then(data => {
        setAgrupacions(data);
        setLoadingAgrupacions(false);
      });
  }, []);

  return (
    <AgrupacionsContext.Provider value={agrupacions}>
      <LoadingAgrupacionsContext.Provider value={loadingAgrupacions}>
        <BrowserRouter basename="/tauler">
          <ConfigProvider locale={caES}>
            <Layout style={{ minHeight: '100vh' }}>
              <MainSider collapsed={collapsed} setCollapsed={setCollapsed} />
              <Layout className="site-layout">
                <Header
                  className="app-layout-header site-layout-background"
                  style={{ marginLeft: collapsed ? 80 : 200 }}
                />
                <Content
                  className="app-layout-content site-layout-background"
                  style={{ marginLeft: collapsed ? 80 : 200 }}>
                  <Switch>
                    <Route exact path="/" component={IniciPage} />
                    {loadingAgrupacions
                      ? ''
                      : agrupacions.map(agrupacio => (
                        <Route
                          key={agrupacio.id_agrupacio}
                          exact
                          path={'/' + kebabCase(agrupacio.nom_curt)}
                          render={(props) => (
                            <Agrupacio {...props} agrupacio={agrupacio} />
                          )}
                        />))
                    }
                    <Route exact path="/socis" component={SocisPage} />
                    <Route exact path="/socis/:username" component={PerfilSociPage} />
                  </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>&copy; 2020 Associació Musical Catalana Crescendo</Footer>
              </Layout>
            </Layout>
          </ConfigProvider>
        </BrowserRouter>
      </LoadingAgrupacionsContext.Provider>
    </AgrupacionsContext.Provider>
  );
};

export default App;
