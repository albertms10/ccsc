import { Role } from "common";
import { Usuari } from "model";
import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import {
  hasRoleAdmin,
  hasRoleDireccioMusical,
  hasRoleJuntaDirectiva,
} from "../../helpers/role-checker";
import { RootState } from "../../store/types";

interface AuthorizedProps {
  render?: (props: PropsWithChildren<any>) => React.ReactNode;
  component?: React.ReactNode;
  elseElement?: React.ReactNode;
  authority?: Role;
}

const Authorized: React.FC<AuthorizedProps> = ({
  render,
  component,
  elseElement,
  authority = "junta_directiva",
  children,
  ...rest
}) => {
  const { roles } = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  const returnItem: any = render
    ? render({ authority, children, ...rest })
    : component
    ? component
    : children;

  switch (authority) {
    case "junta_directiva":
      return hasRoleJuntaDirectiva(roles as Role[])
        ? returnItem
        : elseElement || "";

    case "direccio_musical":
      return hasRoleDireccioMusical(roles as Role[])
        ? returnItem
        : elseElement || "";

    case "admin":
      return hasRoleAdmin(roles as Role[]) ? returnItem : elseElement || "";

    default:
      return elseElement || "";
  }
};

export default Authorized;
