import { Role } from "common";
import {
  ROLES_ADMIN,
  ROLES_DIRECCIO_MUSICAL,
  ROLES_JUNTA_DIRECTIVA,
} from "../constants/constants";
import { includesSome } from "../utils";

export const isRoleJuntaDirectiva = (roles: Role[]) =>
  includesSome(roles, ROLES_JUNTA_DIRECTIVA);

export const isRoleDireccioMusical = (roles: Role[]) =>
  includesSome(roles, ROLES_DIRECCIO_MUSICAL);

export const isRoleAdmin = (roles: Role[]) => includesSome(roles, ROLES_ADMIN);
