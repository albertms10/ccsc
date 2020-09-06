import { Avatar, Dropdown, Menu } from "antd";
import { Usuari } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store/types";
import { logoutRemoveUser } from "store/user/thunks";
import { linkText } from "utils/strings";
import "./user-dropdown.css";

const { Item, Divider } = Menu;

const UserDropdown: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();

  const currentUser = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  return (
    <Dropdown
      placement="bottomRight"
      trigger={["click"]}
      overlay={
        <Menu>
          <Item>
            <Link to={`/${linkText(t("partners"))}/${currentUser.id_persona}`}>
              Perfil
            </Link>
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

export default UserDropdown;
