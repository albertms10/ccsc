import React from "react";
import { Layout } from "antd";
import { MainMenu } from "./components/main-menu";
import { UserSiderItem } from "./components/user-sider-item";
import { useNomAssociacio } from "./hooks";
import { initials } from "../../utils";

import "./main-sider.css";

const { Sider } = Layout;

export default ({ collapsed, setCollapsed, broken, setBroken }) => {
  const [nomAssociacio] = useNomAssociacio();

  return (
    <Sider
      className="main-layout-sider"
      theme="dark"
      breakpoint="lg"
      onBreakpoint={setBroken}
      collapsedWidth={broken ? 0 : 80}
      collapsible
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
      <MainMenu collapsed={collapsed} />
      <UserSiderItem />
    </Sider>
  );
};
