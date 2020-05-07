import { includesSome } from "../utils";

const ROLE_JUNTA_DIRECTIVA = "ROLE_JUNTA_DIRECTIVA";
const ROLE_DIRECTOR_MUSICAL = "ROLE_JUNTA_DIRECTIVA";
const ROLE_ADMIN = "ROLE_ADMIN";

export const isJuntaDirectiva = (roles) =>
  includesSome(roles, [
    ROLE_JUNTA_DIRECTIVA,
    ROLE_DIRECTOR_MUSICAL,
    ROLE_ADMIN,
  ]);

export const isDirectorMusical = (roles) =>
  includesSome(roles, [ROLE_DIRECTOR_MUSICAL, ROLE_ADMIN]);

export const isAdmin = (roles) => includesSome(roles, [ROLE_ADMIN]);
