import { Assaig, Moviment, Projecte, Veu } from "model";
import { SearchFilters } from "../utils/search-filter";

type SearchFilter = (...args: any) => SearchFilters;

export const searchFilterAssaig: SearchFilter = (assaig: Assaig) => ({
  texts: [
    assaig.titol,
    ...assaig.formacions.map((formacio) => formacio.nom_curt),
    ...assaig.projectes.map((projecte) => projecte.titol),
    ...(assaig.hora_inici ? [] : ["Hora a determinar"]),
  ],
  dates: [assaig.data_inici, ...(assaig.data_final ? [assaig.data_final] : [])],
});

export const searchFilterMoviment: SearchFilter = (moviment: Moviment) => ({
  texts: [
    moviment.titol_obra,
    moviment.titol_moviment,
    moviment.subtitol,
    moviment.num_cataleg,
    ...(moviment.projectes
      ? moviment.projectes.map((projecte) => projecte.titol)
      : []),
  ],
});

export const searchFilterProjecte: SearchFilter = (projecte: Projecte) => ({
  texts: [
    projecte.titol,
    projecte.descripcio,
    projecte.any_inici_curs,
    projecte.any_final_curs,
    projecte.inicials,
    ...(projecte.formacions ? projecte.formacions.map(({ nom }) => nom) : []),
    ...(projecte.directors ? projecte.directors.map(({ nom }) => nom) : []),
  ],
});

export const searchFilterVeus: SearchFilter = (veu: Veu) => ({
  texts: [veu.nom, veu.abreviatura],
});
