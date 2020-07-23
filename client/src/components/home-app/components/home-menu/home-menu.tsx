import { DownCircleFilled } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../store/types";

interface MenuItem {
  key: string;
  title: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    key: "inici",
    title: "Inici",
    path: "/",
  },
  {
    key: "qui-som",
    title: "Qui som?",
    path: "/qui-som",
  },
  {
    key: "concerts",
    title: "Concerts",
    path: "/concerts",
  },
  {
    key: "premsa",
    title: "Premsa",
    path: "/premsa",
  },
  {
    key: "contacte",
    title: "Contacte",
    path: "/contacte",
  },
  {
    key: "inicia-sessio",
    title: "Inicia sessió",
    path: "/inicia-sessio",
  },
];

const HomeMenu: React.FC = () => {
  const user = useSelector(({ user }: RootState) => user.currentUser);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      overflowedIndicator={<DownCircleFilled style={{ color: "#fff" }} />}
      defaultSelectedKeys={["inici"]}
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.path}>
            {item.key === "inicia-sessio" && Object.keys(user).length > 0
              ? "Vés al tauler"
              : item.title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default HomeMenu;
