import React from "react";
import { Layout } from "antd";
import { MainMenu } from "./components/main-menu";

import "./main-sider.css";
import { UserSider } from "../user-sider";

const { Sider } = Layout;

export default ({ collapsed, setCollapsed }) => {
  return (
    <Sider
      className="main-layout-sider"
      theme="dark"
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div className="main-layout-title-wrapper">
        {collapsed ? (
          <div className="main-layout-title-short">AMCC</div>
        ) : (
          <div className="main-layout-title-long">
            Associació Musical Catalana Crescendo
          </div>
        )}
      </div>
      <MainMenu collapsed={collapsed} />
      <UserSider />
    </Sider>
  );
};
