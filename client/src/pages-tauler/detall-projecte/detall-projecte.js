import { Layout, Menu, PageHeader, Space, Spin } from "antd";
import React, { useContext, useEffect, createContext } from "react";
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import { SiderSetCollapsedContext } from "../../components/tauler-app/contexts/sider-context";
import { ColorCard } from "../../standalone/color-card";
import { AssajosProjecte } from "./components/assajos-projectes";
import "./detall-projecte.css";
import { ResumProjecte } from "./components/resum-projecte";
import { useProjecte } from "./hooks";

export const ProjecteContext = createContext({});

export default ({ match }) => {
  const setCollapsed = useContext(SiderSetCollapsedContext);

  const history = useHistory();
  const { id } = useParams();

  const [projecte, loading] = useProjecte(id);

  useEffect(() => setCollapsed(true), [setCollapsed]);

  return (
    <ProjecteContext.Provider value={projecte}>
      <Layout className="layout-projecte">
        <Spin spinning={loading}>
          <PageHeader
            ghost={false}
            title={
              <Space size="middle">
                <ColorCard hoverable={false} color={"#" + projecte.color} />
                {projecte.titol}
              </Space>
            }
            onBack={() => history.goBack()}
          />
        </Spin>
        <Layout>
          <Layout.Sider className="layout-projecte-sider">
            <Menu>
              <Menu.Item>
                <Link to={`${match.url}`}>Resum</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`${match.url}/assajos`}>Assajos</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`${match.url}/obres`}>Obres</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`${match.url}/concerts`}>Concerts</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={`${match.url}/participants`}>Participants</Link>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            <Switch>
              <Route
                exact
                path={`${match.path}`}
                component={ResumProjecte}
              />
              <Route
                path={`${match.path}/assajos`}
                component={AssajosProjecte}
              />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    </ProjecteContext.Provider>
  );
};
