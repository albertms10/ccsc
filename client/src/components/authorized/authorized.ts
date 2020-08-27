import { Role } from "common";
import {
  hasRoleAdmin,
  hasRoleMusicalManagement,
  hasRoleBoardOfDirectors,
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
  authority = "board_of_directors",
  children,
  ...rest
}) => {
  const { roles } = useSelector(({ user }: RootState) => user.currentUser);

  const returnItem = render
    ? render({ authority, children, ...rest })
    : component ?? children;

  const checkRole = useCallback(
    (fn: (roles: Role[]) => boolean) =>
      fn(roles) ? returnItem : elseElement || "",
    [roles, returnItem, elseElement]
  );

  switch (authority) {
    case "board_of_directors":
      return checkRole(hasRoleBoardOfDirectors);

    case "musical_management":
      return checkRole(hasRoleMusicalManagement);

    case "admin":
      return checkRole(hasRoleAdmin);

    default:
      return elseElement || "";
  }
};

export default Authorized;
