/// <reference path="./common.d.ts" />

declare module "model" {
  import { Role } from "common";

  export interface Agrupacio {
    id_agrupacio: number;
    nom: string;
    nif: string;
    id_tipus_agrupacio: number;
    tipus_agrupacio: string;
  }

  export interface SeccioAvis {
    id_seccio_avis: number;
    titol: string;
    descripcio: string;
  }

  export interface AcceptacioAvis {
    titol: string;
    descripcio: string;
    form_name: string;
    requerida: boolean;
  }

  export interface Avis {
    id_avis: number;
    titol: string;
    descripcio: string;
    titol_acceptacions: string;
    seccions: SeccioAvis[];
    acceptacions: AcceptacioAvis[];
  }

  export interface Titular {
    id_titular: number;
    titol: string;
    imatge: string;
    data_inici: string;
    data_final: string;
    link: string;
    ordre: number;
  }

  export interface Activitat {
    data_alta: string;
    data_baixa: string;
    dies_activitat: number;
  }

  export interface EstatConfirmacio {
    id_estat_confirmacio: number;
    estat: string;
  }

  export interface Idioma {
    id_idioma: string;
    nom: string;
  }

  export interface ItemGrafica {
    x: number | string;
    y: number;
  }

  export interface NomPila {
    nom: string;
    cognoms: string;
  }

  export interface Curs {
    id_curs: string;
    inici: string;
    final: string;
  }

  export interface Persona extends NomPila {
    id_persona: number;
    nom_complet: string;
    naixement: string;
    dni: number;
    email: string;
    telefon: string;
    nom_veu?: string;
    abreviatura_veu?: string;
  }

  export interface ConvocatoriaGenerica {
    id_estat_confirmacio?: number;
    amb_retard?: boolean;
  }

  export interface Convocatoria extends ConvocatoriaGenerica {
    id_persona: number;
  }

  export interface PersonaConvocada extends Persona, Convocatoria {}

  export interface CountSocis {
    count_actuals: number;
    count_altes: number;
    count_baixes: number;
  }

  export interface Soci extends Persona {
    id_soci: number;
    username?: string;
    dies_activitat?: number;
    data_inactiu?: string;
    es_actiu?: boolean;
    roles?: Role[];
  }

  export interface Director extends Persona {
    id_director?: number;
  }

  export interface Usuari {
    id_usuari: number;
    id_persona: number;
    username: string;
    nom: string;
    cognoms: string;
    es_dona: boolean;
    es_actiu?: boolean;
    avisos: string | string[];
    roles?: string | import("common").Role[];
    salt?: string;
    encrypted_password?: string;
  }

  export interface BaseFormacio {
    id_formacio: number;
    convocada?: boolean;
  }

  export interface Formacio extends BaseFormacio {
    nom: string;
    nom_curt: string;
    descripcio: string;
    num_persones: number;
  }

  export interface BaseProjecte {
    id_projecte: number;
    treballat?: boolean;
  }

  export interface Projecte extends BaseProjecte {
    titol: string;
    descripcio: string;
    data_inici: string;
    data_final: string;
    any_inici_curs: string;
    any_final_curs: string;
    inicials: string;
    color: string;
    formacions: Formacio[];
    directors: Director[];
  }

  export interface Moviment {
    id_moviment: number;
    id_obra: number;
    titol_moviment: string;
    titol_obra?: string;
    subtitol: string;
    num_cataleg: string;
    ordre: number;
    primer?: number;
    es_unic_moviment: boolean;
    durada: string;
    projectes: Projecte[];
  }

  export interface Pais {
    id_pais: number;
    nom: string;
  }

  export interface Esdeveniment {
    id_esdeveniment: number;
    titol: string;
    data_inici?: string;
    dia_inici: string;
    hora_inici: string;
    dia_final?: string;
    data_final?: string;
    hora_final: string;
    tipus?: string;
    id_estat_esdeveniment: number;
    estat_esdeveniment: string;
    establiment: string;
    localitzacio: string;
    notes: string;
  }

  export interface Assaig extends Esdeveniment {
    id_assaig: number;
    formacions: Formacio[];
    projectes: Projecte[];
    moviments: Moviment[];
  }

  export interface AssistenciaEsdeveniment {
    id_esdeveniment?: number;
    dia_inici: string;
    hora_inici: string;
    convocats: number;
  }

  export interface AssistenciaAssaig extends AssistenciaEsdeveniment {
    id_assaig: number;
    assaig?: string;
  }

  export interface AssistenciaAssaigEstat extends AssistenciaAssaig {
    confirmats_retard: number;
    confirmats_puntuals: number;
    pendents: number;
    cancelats: number;
  }

  export interface AssistenciaAssaigVeus extends AssistenciaAssaig {
    sopranos: number;
    contralts: number;
    tenors: number;
    baixos: number;
  }

  export type AssistenciesAssaig =
    | AssistenciaAssaigEstat
    | AssistenciaAssaigVeus;

  export interface Concert extends Esdeveniment {
    id_concert: number;
    id_projecte: number;
    titol_concert: string;
    titol_projecte: string;
    color_projecte: string;
    inicials_projecte: string;
  }

  export interface Reunio extends Esdeveniment {
    id_reunio: number;
  }

  export type TipusEsdeveniment = Assaig | Concert | Reunio | Assemblea;

  export interface Assemblea extends Reunio {
    id_assemblea: number;
  }

  export interface Obra {
    id_obra: number;
    titol: string;
    subtitol: string;
    durada_total: string;
    formacions?: Formacio[];
  }

  export interface BaseVeu {
    id_veu: string;
    convocada?: boolean;
  }

  export interface Veu extends BaseVeu {
    id_veu: string;
    nom: string;
    abreviatura: string;
  }
}
