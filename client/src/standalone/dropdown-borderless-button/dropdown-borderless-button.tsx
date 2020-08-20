import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import React from "react";
import { BorderlessButton } from "standalone/borderless-button";

interface DropdownItem extends MenuItemProps {
  key: string;
  action: any;
}

interface DropdownBorderlessButtonProps {
  items?: DropdownItem[];
  icon?: React.ReactNode;
}

const DropdownBorderlessButton: React.FC<DropdownBorderlessButtonProps> = ({
  items = [],
  icon = <MoreOutlined />,
}) => (
  <Dropdown
    placement="bottomRight"
    trigger={["click"]}
    overlay={
      <Menu>
        {items.map(({ key, action, danger, onClick }) => (
          <Menu.Item key={key} danger={danger} {...(onClick && { onClick })}>
            {action}
          </Menu.Item>
        ))}
      </Menu>
    }
  >
    <BorderlessButton shape="circle" icon={icon} />
  </Dropdown>
);

export default DropdownBorderlessButton;
