import { LoadingOutlined } from "@ant-design/icons/lib";
import { Menu, Spin } from "antd";
import React, { useContext } from "react";
import { SiderCollapsedContext } from "../../../tauler-app/contexts/sider-context";

interface MenuItemGroupProps {
  key: any;
  title: string;
  loading?: boolean;
}

const MenuItemGroup: React.FC<MenuItemGroupProps> = ({
  key,
  title,
  loading = false,
  children,
}) => {
  const collapsed = useContext(SiderCollapsedContext);

  return (
    <Menu.ItemGroup
      key={key}
      className="main-menu-item-group"
      title={collapsed ? "" : title}
    >
      {loading ? (
        <Menu.Item>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ color: "white", paddingLeft: "1rem" }}
              />
            }
          />
        </Menu.Item>
      ) : (
        children
      )}
    </Menu.ItemGroup>
  );
};

export default MenuItemGroup;
