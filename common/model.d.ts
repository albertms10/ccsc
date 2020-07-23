/// <reference path="./common.d.ts" />

declare module "model" {
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
    titol_acceptacions?: string;
    seccions?: SeccioAvis[];
    acceptacions?: AcceptacioAvis[];
  }

  export interface Activitat {
    data_alta: string;
    data_baixa: string;
    dies_activitat: number;
  }

  export interface Persona {
    id_persona: number;
    nom: string;
    cognoms: string;
    nom_complet?: string;
  }

  export interface Soci extends Persona {
    id_soci: number;
    username?: string;
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
    avisos?: string | number[];
    roles?: string | import("common").Role[];
    salt?: string;
    encrypted_password?: string;
  }

  export interface Formacio {
    id_formacio: number;
    nom: string;
    nom_curt: string;
    descripcio?: string;
    num_persones?: number;
  }

  export interface Projecte {
    id_projecte: number;
    titol: string;
    descripcio: string;
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
    es_unic_moviment: boolean;
    projectes: Projecte[];
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

  export interface Concert extends Esdeveniment {
    id_concert: number;
  }

  export interface Reunio extends Esdeveniment {
    id_reunio: number;
  }

  export interface Assemblea extends Reunio {
    id_assemblea: number;
  }

  export interface Obra {
    id_obra: number;
    titol: string;
  }

  export interface Veu {
    id_veu: string;
    nom: string;
    abreviatura: string;
  }
}
