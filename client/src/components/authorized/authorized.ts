import { Role } from "common";
import {
  hasRoleAdmin,
  hasRoleDireccioMusical,
  hasRoleJuntaDirectiva,
} from "helpers/role-checker";
import React, { PropsWithChildren, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/types";

export interface AuthorizedRenderProps {
  authority: Role;
  children: React.ReactNode;
}

interface AuthorizedPropsRest {
  [key: string]: unknown;
}

interface AuthorizedProps extends AuthorizedPropsRest {
  render?: (
    props: PropsWithChildren<AuthorizedRenderProps & AuthorizedPropsRest>
  ) => React.ReactNode;
  component?: React.ReactNode;
  elseElement?: React.ReactNode;
  authority?: Role;
}

// TODO
// @ts-ignore
const Authorized: React.FC<AuthorizedProps> = ({
  render,
  component,
  elseElement,
  authority = "junta_directiva",
  children,
  ...rest
}) => {
  const roles = useSelector(
    ({ user }: RootState) => user.currentUser.roles
  ) as Role[];

  const returnItem = render
    ? render({ authority, children, ...rest })
    : component ?? children;

  const checkRole = useCallback(
    (fn: (roles: Role[]) => boolean) =>
      fn(roles) ? returnItem : elseElement || "",
    [roles, returnItem, elseElement]
  );

  switch (authority) {
    case "junta_directiva":
      return checkRole(hasRoleJuntaDirectiva);

    case "direccio_musical":
      return checkRole(hasRoleDireccioMusical);

    case "admin":
      return checkRole(hasRoleAdmin);

    default:
      return elseElement || "";
  }
};

export default Authorized;
