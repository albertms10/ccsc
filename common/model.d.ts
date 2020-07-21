/// <reference path="./common.d.ts" />

declare module "model" {
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
    id_avis?: number;
    titol?: string;
    descripcio?: string;
    titol_acceptacions?: string;
    seccions?: SeccioAvis[];
    acceptacions?: AcceptacioAvis[];
  }

  export interface Persona {
    id_persona?: number;
    nom?: string;
    cognoms?: string;
    nom_complet?: string;
  }

  export interface Soci extends Persona {
    id_soci?: number;
    username?: string;
  }

  export interface Director extends Persona {
    id_director?: number;
  }

  export interface Usuari {
    id_usuari?: number;
    id_persona?: number;
    username?: string;
    nom?: string;
    cognoms?: string;
    es_dona?: boolean;
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
  }

  export interface Projecte {
    id_projecte: number;
    titol: string;
    descripcio: string;
    any_inici_curs: string;
    any_final_curs: string;
    inicials: string;
    formacions: Formacio[];
    directors: Director[];
  }

  export interface Moviment {
    id_moviment: number;
    titol_moviment: string;
    titol_obra?: string;
    subtitol: string;
    num_cataleg: string;
    projectes: Projecte[];
  }

  export interface Esdeveniment {
    id_esdeveniment: number;
    data_inici?: string;
    dia_inici: string;
    hora_inici: string;
    data_final?: string;
    hora_final: string;
  }

  export interface Assaig extends Esdeveniment {
    id_assaig: number;
    titol: string;
    formacions: Formacio[];
    projectes: Projecte[];
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
