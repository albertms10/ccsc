/// <reference path="../../common/model.d.ts" />

declare module "server-model" {
  import { RequestHandler } from "express";
  import { ParamsDictionary } from "express-serve-static-core";
  import { ParsedQs } from "qs";

  export type ControllerRequestHandler<
    ResBody = null,
    ReqBody = null,
    ReqQuery = ParsedQs
  > = RequestHandler<ParamsDictionary, ResBody, ReqBody, ReqQuery>;

  export type Count = { count: number };
  export type Name = { name: string };

  export interface UsernamePasswordPost {
    username: string;
    password: string;
  }

  export interface EmailResponse {
    exists: boolean;
    accessToken?: string;
    message?: string;
  }

  export interface AssaigPost {
    dia_inici: string;
    hora: [string, string];
    es_general: boolean;
    es_extra: boolean;
    projectes: number[];
    formacions: number[];
  }

  export interface ObraPost {
    titol: string;
    subtitol: string;
    anys: [number, number];
    id_idioma: number;
  }

  export interface ProjectePost {
    titol: string;
    descripcio: string;
    inicials: string;
    color: string;
    data: [string, string];
    id_curs: number;
    formacions: number[];
  }
}
