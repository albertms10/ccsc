import { Menu } from "antd";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import React from "react";
import { Link } from "react-router-dom";

interface MainMenuItemProps extends MenuItemProps {
  key: string;
  path: string;
}

const MainMenuItem: React.FC<MainMenuItemProps> = ({
  title,
  icon,
  key,
  path,
  ...rest
}) => (
  <Menu.Item key={key} {...rest}>
    <Link to={path}>
      {icon}
      <span>{title}</span>
    </Link>
  </Menu.Item>
);

export default MainMenuItem;
