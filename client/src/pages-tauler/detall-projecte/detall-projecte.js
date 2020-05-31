import { Menu, Layout } from "antd";
import React from "react";

const { Sider } = Layout;

export default () => {
  return (
    <Sider>
      <Menu>
        <Menu.Item>Assajos</Menu.Item>
        <Menu.Item>Obres</Menu.Item>
        <Menu.Item>Concerts</Menu.Item>
        <Menu.Item>Participants</Menu.Item>
      </Menu>
    </Sider>
  );
};
