import { LoadingOutlined } from "@ant-design/icons/lib";
import { Menu, Spin } from "antd";
import { SiderCollapsedContext } from "components/tauler-app/contexts/sider-context";
import React, { useContext } from "react";

interface MainMenuItemGroupProps {
  key: string;
  title: string;
  loading?: boolean;
}

const MainMenuItemGroup: React.FC<MainMenuItemGroupProps> = ({
  key,
  title,
  loading = false,
  children,
  ...rest
}) => {
  const collapsed = useContext(SiderCollapsedContext);

  return (
    <Menu.ItemGroup
      key={key}
      className="main-menu-item-group"
      title={collapsed ? "" : title}
      {...rest}
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

export default MainMenuItemGroup;
