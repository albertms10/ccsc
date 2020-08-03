/// <reference path="../../common/model.d.ts" />

declare module "raw-model" {
  import { RequestHandler } from "express";
  import { ParamsDictionary } from "express-serve-static-core";
  import { BaseAvis, BaseMoviment, BaseProjecte, Esdeveniment } from "model";
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

  export interface AvisRaw extends BaseAvis {
    seccions: string;
    acceptacions: string;
  }

  export interface EsdevenimentMusicalRaw extends Esdeveniment {
    formacions: string;
    moviments: string;
  }

  export interface AssaigRaw extends EsdevenimentMusicalRaw {
    id_assaig: number;
    projectes: string;
  }

  export interface AssaigPost {
    dia_inici: string;
    hora: [string, string];
    es_general: boolean;
    es_extra: boolean;
    projectes: number[];
    formacions: number[];
  }

  export interface MovimentRaw extends BaseMoviment {
    projectes: string;
  }

  export interface ProjecteRaw extends BaseProjecte {
    formacions: string;
    directors: string;
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

  export interface SociRaw {
    roles: string;
  }
}
