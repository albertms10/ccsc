import { DownCircleFilled } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store/types";
import { linkText } from "utils/strings";

interface MenuItem {
  key: string;
  title: string;
  path: string;
}

const HomeMenu: React.FC = () => {
  const { t } = useTranslation("home");

  const user = useSelector(({ user }: RootState) => user.currentUser);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        key: "/",
        title: t("home title"),
        path: "/",
      },
      ...[
        t("bio title"),
        t("concerts title"),
        t("press title"),
        t("contact title"),
        t("sign-in:sign in"),
      ].map((item) => ({
        key: linkText(item),
        title: item,
        path: `/${linkText(item)}`,
      })),
    ],
    [t]
  );

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      overflowedIndicator={<DownCircleFilled style={{ color: "#fff" }} />}
      defaultSelectedKeys={["/"]}
    >
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.path}>
            {item.key === linkText(t("sign-in:sign in")) &&
            Object.keys(user).length > 0
              ? t("sign-in:go to dashboard")
              : item.title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default HomeMenu;
