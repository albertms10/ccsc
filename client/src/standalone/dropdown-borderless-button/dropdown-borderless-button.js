import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { BorderlessButton } from "../borderless-button";

const DropdownBorderlessButton = ({ items = [], icon = <MoreOutlined /> }) => (
  <Dropdown
    placement="bottomRight"
    trigger="click"
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

DropdownBorderlessButton.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      action: PropTypes.node.isRequired,
      onClick: PropTypes.func,
    })
  ),
  icon: PropTypes.node,
};

export default DropdownBorderlessButton;
