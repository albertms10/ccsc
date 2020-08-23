import { Layout, Menu, PageHeader, Space, Spin } from "antd";
import { Authorized } from "components/authorized";
import { SiderSetCollapsedContext } from "components/tauler-app/contexts/sider-context";
import { useAPI } from "helpers";
import { Projecte } from "model";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
  useParams,
} from "react-router-dom";
import { ColorCard } from "standalone/color-card";
import { linkText } from "utils";
import { AssajosProjecte } from "./components/assajos-projecte";
import { RepertoriProjecte } from "./components/repertori-projecte";
import { ResumProjecte } from "./components/resum-projecte";
import "./detall-projecte.css";

export const ProjecteContext = createContext<Projecte>({} as Projecte);
export const SetActionContext = createContext<
  React.Dispatch<React.SetStateAction<React.ReactNode>>
>((_) => {});

type DetallProjecteProps = RouteComponentProps;

const DetallProjecte: React.FC<DetallProjecteProps> = ({ match }) => {
  const { t } = useTranslation("dashboard");

  const setCollapsed = useContext(SiderSetCollapsedContext);

  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const [projecte, loading] = useAPI<Projecte>(
    `/projectes/${id}`,
    {} as Projecte
  );

  const [action, setAction] = useState<React.ReactNode>(<></>);

  useEffect(() => {
    setCollapsed(true);
  }, [setCollapsed]);

  return (
    <ProjecteContext.Provider value={projecte}>
      <SetActionContext.Provider value={setAction}>
        <Layout className="layout-projecte">
          <PageHeader
            ghost={false}
            title={
              <Spin spinning={loading}>
                <Space size="middle">
                  <ColorCard hoverable={false} color={`#${projecte.color}`} />
                  {projecte.titol}
                </Space>
              </Spin>
            }
            onBack={() => history.goBack()}
            extra={<Authorized>{action}</Authorized>}
          />
          <Layout>
            <Layout.Sider className="layout-projecte-sider">
              <Menu>
                <Menu.Item>
                  <Link to={`${match.url}`}>Resum</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={`${match.url}/${linkText(t("rehearsals"))}`}>
                    {t("rehearsals")}
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={`${match.url}/${linkText(t("repertoire"))}`}>
                    {t("repertoire")}
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={`${match.url}/${linkText(t("concerts"))}`}>
                    {t("concerts")}
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to={`${match.url}/${linkText(t("participants"))}`}>
                    {t("participants")}
                  </Link>
                </Menu.Item>
              </Menu>
            </Layout.Sider>
            <Layout.Content>
              <Switch>
                <Route exact path={`${match.path}`} component={ResumProjecte} />
                <Route
                  path={`${match.path}/${linkText(t("rehearsals"))}`}
                  component={AssajosProjecte}
                />
                <Route
                  path={`${match.path}/${linkText(t("repertoire"))}`}
                  component={RepertoriProjecte}
                />
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </SetActionContext.Provider>
    </ProjecteContext.Provider>
  );
};

export default DetallProjecte;
