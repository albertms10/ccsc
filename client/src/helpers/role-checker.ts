import { Role } from "common";
import {
  ROLES_ADMIN,
  ROLES_MUSICAL_MANAGEMENT,
  ROLES_BOARD_OF_DIRECTORS,
} from "constants/constants";
import { includesSome } from "utils";

export const hasRoleBoardOfDirectors = (roles: Role[]): boolean =>
  includesSome(roles, ROLES_BOARD_OF_DIRECTORS);

export const hasRoleMusicalManagement = (roles: Role[]): boolean =>
  includesSome(roles, ROLES_MUSICAL_MANAGEMENT);

export const hasRoleAdmin = (roles: Role[]): boolean =>
  includesSome(roles, ROLES_ADMIN);
