import { Role } from "common";
import { Usuari } from "model";
import React from "react";
import { useSelector } from "react-redux";
import { ROLES_JUNTA_DIRECTIVA } from "../../constants/constants";
import {
  isRoleAdmin,
  isRoleDireccioMusical,
  isRoleJuntaDirectiva,
} from "../../helpers/role-checker";
import { RootState } from "../../store/types";

interface AuthorizedProps {
  render: Function;
  component: JSX.Element;
  elseElement: JSX.Element;
  authority: Role;
}

const Authorized: React.FC<AuthorizedProps> = ({
  render,
  component,
  elseElement,
  authority = ROLES_JUNTA_DIRECTIVA[0],
  children,
  ...rest
}) => {
  const { roles } = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  const returnItem = render
    ? render({ authority, children, ...rest })
    : component
    ? component
    : children;

  switch (authority) {
    case "junta_directiva":
      return isRoleJuntaDirectiva(roles as Role[])
        ? returnItem
        : elseElement || "";

    case "direccio_musical":
      return isRoleDireccioMusical(roles as Role[])
        ? returnItem
        : elseElement || "";

    case "admin":
      return isRoleAdmin(roles as Role[]) ? returnItem : elseElement || "";

    default:
      return elseElement || "";
  }
};

export default Authorized;