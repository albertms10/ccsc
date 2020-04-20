import React from "react";
import { Layout } from "antd";
import { MainMenu } from "./components/main-menu";
import { UserSiderItem } from "./components/user-sider-item";
import { useAssociacio } from "./hooks";
import { initials } from "../../utils";

import "./main-sider.css";

const { Sider } = Layout;

export default ({ collapsed, setCollapsed }) => {
  const associacio = useAssociacio();

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
          <div className="main-layout-title-short">{initials(associacio)}</div>
        ) : (
          <div className="main-layout-title-long">{associacio}</div>
        )}
      </div>
      <MainMenu collapsed={collapsed} />
      <UserSiderItem />
    </Sider>
  );
};
