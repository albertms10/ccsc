declare module "common" {
  export type Role =
    | "usuari"
    | "junta_directiva"
    | "direccio_musical"
    | "admin";

  export interface AnyMap {
    [key: string]: any;
  }

  export interface BooleanMap {
    [key: string]: boolean;
  }

  export interface FetchError {
    status: number;
    message: string;
    hideMessage?: boolean;
    description?: string;
    okText?: string;
    okOnly?: boolean;
    noAction?: boolean;
  }

  export interface ResponseError {
    error: FetchError;
  }

  export interface EmailEsperaResponse {
    exists: boolean;
    message: string;
  }
}
