import { DownOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons/lib";
import { Button, Dropdown, Menu } from "antd";
import React from "react";

interface ActionButtonProps {
  mainAction: string;
  icon?: React.ReactElement;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  mainAction,
  icon = <PlusOutlined />,
  children,
  ...rest
}) =>
  React.Children.count(children) > 1 ? (
    <Dropdown trigger={["click"]} overlay={<Menu>{children}</Menu>}>
      <Button {...rest} type="primary">
        {mainAction} <DownOutlined />
      </Button>
    </Dropdown>
  ) : (
    <Button {...rest} type="primary" icon={icon}>
      {children || mainAction}
    </Button>
  );

export default ActionButton;
