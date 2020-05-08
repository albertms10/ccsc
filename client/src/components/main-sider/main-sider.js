import React, { useContext } from "react";
import { Layout } from "antd";
import { MainMenu } from "./components/main-menu";
import { initials } from "../../utils";

import "./main-sider.css";
import {
  SiderBrokenContext,
  SiderCollapsedContext,
  SiderSetBrokenContext,
  SiderSetCollapsedContext,
} from "../tauler-app/contexts/sider-context";
import { AssociacioContext } from "../tauler-app/tauler-app";
import { MenuOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export default () => {
  const associacio = useContext(AssociacioContext);
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
            {initials(associacio.nom)}
          </div>
        ) : (
          <div className="main-layout-title-long">{associacio.nom}</div>
        )}
      </div>
      <MainMenu />
    </Sider>
  );
};
