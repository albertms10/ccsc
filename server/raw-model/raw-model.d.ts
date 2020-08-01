/// <reference path="../../common/model.d.ts" />

declare module "raw-model" {
  import { BaseAvis, BaseMoviment, BaseProjecte, Esdeveniment } from "model";

  export type ID = { id: string };
  export type IDAssaig = { id_assaig: string };
  export type IDMoviment = { id_moviment: string };
  export type IDFormacio = { id_formacio: string };
  export type IDProjecte = { id_projecte: string };
  export type IDVeu = { id_veu: string };

  export type Count = { count: number };
  export type Name = { name: string };
  export type Inicials = { inicials: string };
  export type Username = { username: string };

  export type IDAssaigMoviment = IDAssaig & IDMoviment;
  export type IDAssaigFormacio = IDAssaig & IDFormacio;
  export type IDAssaigProjecte = IDAssaig & IDProjecte;
  export type IDAssaigVeu = IDAssaig & IDVeu;
  export type IDProjecteMoviment = IDProjecte & IDMoviment;

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
