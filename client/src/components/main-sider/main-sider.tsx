import { MenuOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React, { useContext } from "react";
import { ErrorBoundary } from "../../standalone/error-boundary";
import { initials } from "../../utils";
import {
  SiderBrokenContext,
  SiderCollapsedContext,
  SiderSetBrokenContext,
  SiderSetCollapsedContext,
} from "../tauler-app/contexts/sider-context";
import { EntitatContext } from "../tauler-app/tauler-app";
import { MainMenu } from "./components/main-menu";
import "./main-sider.css";

const { Sider } = Layout;

const MainSider: React.FC = () => {
  const entitat = useContext(EntitatContext);
  const collapsed = useContext(SiderCollapsedContext);
  const setCollapsed = useContext(SiderSetCollapsedContext);
  const broken = useContext(SiderBrokenContext);
  const setBroken = useContext(SiderSetBrokenContext);

  return (
    <Sider
      className="main-layout-sider"
      theme="dark"
      breakpoint="lg"
      onBreakpoint={setBroken}
      collapsedWidth={broken ? 0 : 80}
      collapsible
      {...(broken ? { trigger: null } : "")}
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div className="main-layout-title-wrapper">
        {broken ? (
          <MenuOutlined
            className="main-sidebar-trigger"
            onClick={() => setCollapsed(true)}
          />
        ) : (
          ""
        )}
        {collapsed || broken ? (
          <div className="main-layout-title-short">
            {initials(entitat.nom)}
          </div>
        ) : (
          <div className="main-layout-title-long">{entitat.nom}</div>
        )}
      </div>
      <ErrorBoundary>
        <MainMenu />
      </ErrorBoundary>
    </Sider>
  );
};

export default MainSider;
