import { Avatar, Dropdown, Menu } from "antd";
import { logoutRemoveUser } from "../../../../redux";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./user-dropdown.css";
import { Link } from "react-router-dom";

export default () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  return (
    <Dropdown
      placement="bottomRight"
      trigger={["click"]}
      overlay={
        <Menu>
          <Menu.Item>
            <Link to={`/socis/${currentUser.id}`}>Perfil</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={() => dispatch(logoutRemoveUser())}>
            Tanca la sessió
          </Menu.Item>
        </Menu>
      }
    >
      <div className="user-menu-item">
        <Avatar size="large" className="user-menu-item-avatar">
          {currentUser.nom[0] + currentUser.cognoms[0]}
        </Avatar>
      </div>
    </Dropdown>
  );
};
