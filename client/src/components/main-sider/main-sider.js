import React, { useContext } from "react";
import { Layout } from "antd";
import { MainMenu } from "./components/main-menu";
import { useNomAssociacio } from "./hooks";
import { initials } from "../../utils";

import "./main-sider.css";
import {
  SiderBrokenContext,
  SiderCollapsedContext,
  SiderSetBrokenContext,
  SiderSetCollapsedContext,
} from "../tauler-app/contexts/sider-context";

const { Sider } = Layout;

export default () => {
  const [nomAssociacio] = useNomAssociacio();
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
        {collapsed ? (
          <div className="main-layout-title-short">
            {initials(nomAssociacio)}
          </div>
        ) : (
          <div className="main-layout-title-long">{nomAssociacio}</div>
        )}
      </div>
      <MainMenu />
    </Sider>
  );
};
