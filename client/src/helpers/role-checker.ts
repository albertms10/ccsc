import { Role } from "common";
import {
  ROLES_ADMIN,
  ROLES_DIRECCIO_MUSICAL,
  ROLES_JUNTA_DIRECTIVA,
} from "constants/constants";
import { includesSome } from "utils";

export const hasRoleJuntaDirectiva = (roles: Role[]): boolean =>
  includesSome(roles, ROLES_JUNTA_DIRECTIVA);

export const hasRoleDireccioMusical = (roles: Role[]): boolean =>
  includesSome(roles, ROLES_DIRECCIO_MUSICAL);

export const hasRoleAdmin = (roles: Role[]): boolean =>
  includesSome(roles, ROLES_ADMIN);
