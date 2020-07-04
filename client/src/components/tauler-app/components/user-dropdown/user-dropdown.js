import { Avatar, Dropdown, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRemoveUser } from "../../../../redux";
import "./user-dropdown.css";

const { Item, Divider } = Menu;

export default () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();

  return (
    <Dropdown
      placement="bottomRight"
      trigger={["click"]}
      overlay={
        <Menu>
          <Item>
            <Link to={`/socis/${currentUser.id_persona}`}>Perfil</Link>
          </Item>
          <Divider />
          <Item onClick={() => dispatch(logoutRemoveUser())}>
            Tanca la sessió
          </Item>
        </Menu>
      }
    >
      <div className="user-menu-item">
        <Avatar size="large" className="user-menu-item-avatar">
          {currentUser.nom.charAt(0) + currentUser.cognoms.charAt(0)}
        </Avatar>
      </div>
    </Dropdown>
  );
};
