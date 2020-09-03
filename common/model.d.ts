/// <reference path="./common.d.ts" />

declare module "model" {
  import { BooleanMap, Role } from "common";

  export interface Entitat {
    id_entitat: number;
    nom: string;
    nif: string;
    id_tipus_entitat: number;
    tipus_entitat: string;
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

  export interface BaseAvis {
    id_avis: number;
    titol: string;
    descripcio: string;
    titol_acceptacions: string;
  }

  export interface Avis extends BaseAvis {
    seccions: SeccioAvis[];
    acceptacions: AcceptacioAvis[];
  }

  export interface Titular {
    id_titular: number;
    titol: string;
    imatge: string;
    datahora_inici: string;
    datahora_final: string;
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
    dni: string;
    email: string;
    telefon: string;
    nom_veu?: string;
    abreviatura_veu?: string;
    id_pais: number;
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

  export interface BaseSoci extends Persona {
    id_soci: number;
    username?: string;
    dies_activitat?: number;
    data_inactiu?: string;
    es_actiu?: boolean;
    experiencia_musical: string;
    estudis_musicals: string;
    acceptacions: BooleanMap | string[];
    data_alta: string;
  }

  export interface Soci extends BaseSoci {
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
    avisos: string[];
    roles: Role[];
    hash?: string;
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

  export interface BaseProjecteTreballat {
    id_projecte: number;
    treballat?: boolean;
  }

  export interface BaseProjecte extends BaseProjecteTreballat {
    titol: string;
    descripcio: string;
    data_inici: string;
    data_final: string;
    any_inici_curs: string;
    any_final_curs: string;
    inicials: string;
    color: string;
  }

  export interface Projecte extends BaseProjecte {
    formacions: Formacio[];
    directors: Director[];
  }

  export interface BaseMoviment {
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
    compassos: number;
  }

  export interface Moviment extends BaseMoviment {
    projectes: Projecte[];
  }

  export interface SeccioMoviment {
    id_seccio_moviment: number;
    titol: string;
    compas_inici: number;
    compas_final?: number;
  }

  export interface Pais {
    id_pais: number;
    nom: string;
  }

  export interface Provincia {
    id_provincia: number;
    nom: string;
  }

  export interface Ciutat {
    id_ciutat: number;
    nom: string;
    id_provincia: number;
  }

  export interface Establiment {
    id_establiment: number;
    id_localitzacio: number;
    nom: string;
    descripcio: string;
    lloc_web: string;
    id_tipus_establiment: number;
    tipus_establiment: string;
  }

  export interface Localitzacio {
    id_localitzacio: number;
    id_tipus_via: number;
    tipus_via: string;
    carrer: string;
    numero: number;
    fins_numero: number;
    codi_postal: number;
    gmaps: string;
    id_ciutat: number;
  }

  export interface TipusVia {
    id_tipus_via: number;
    nom: string;
    abreviatura: string;
  }

  export interface BaseEsdeveniment {
    id_esdeveniment: number;
    data: string;
    hora_inici: string;
  }

  export interface Esdeveniment extends BaseEsdeveniment {
    titol: string;
    datahora_inici?: string;
    datahora_final?: string;
    hora_final: string;
    tipus?: string;
    id_estat_esdeveniment: number;
    estat_esdeveniment: string;
    establiment: string;
    localitzacio: string;
    notes: string;
  }

  export interface EsdevenimentMusical extends Esdeveniment {
    formacions: Formacio[];
    moviments: Moviment[];
  }

  export interface Assaig extends EsdevenimentMusical {
    id_assaig: number;
    projectes: Projecte[];
    es_general: boolean;
    es_extra: boolean;
  }

  export interface AssistenciaEsdeveniment extends BaseEsdeveniment {
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

  export interface Concert extends EsdevenimentMusical {
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
    compassos_totals: number;
    formacions?: Formacio[];
  }

  export interface FragmentMovimentEsdevenimentMusical {
    id_fragment_esdeveniment_musical: number;
    id_esdeveniment_musical: number;
    id_moviment: number;
    compas_inici: number;
    compas_final?: number;
    nota: string;
  }

  export interface BaseVeu {
    id_veu: string;
    convocada?: boolean;
  }

  export interface Veu extends BaseVeu {
    nom: string;
    abreviatura: string;
  }
}
