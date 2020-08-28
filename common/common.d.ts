declare module "common" {
  export type Role =
    | "user"
    | "board_of_directors"
    | "musical_management"
    | "admin";

  export interface AnyMap {
    [key: string]: any;
  }

  export interface BooleanMap {
    [key: string]: boolean;
  }

  export type AssistenciaGroupBy = "state" | "voices";

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
