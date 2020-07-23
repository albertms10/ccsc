import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  title: string;
  icon: React.ReactElement;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, path, ...rest }) => (
  <Menu.Item {...rest} key={path}>
    <Link to={path}>
      {icon}
      <span>{title}</span>
    </Link>
  </Menu.Item>
);

export default MenuItem;
