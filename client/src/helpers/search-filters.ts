import { Assaig, Moviment, Projecte, Veu } from "model";
import { SearchFilters } from "utils/search-filter";

export const searchFilterAssaig = (assaig: Assaig): SearchFilters => ({
  texts: [
    assaig.titol,
    ...assaig.formacions.map((formacio) => formacio.nom_curt),
    ...assaig.projectes.map((projecte) => projecte.titol),
    ...(assaig.hora_inici ? [] : ["Hora a determinar"]),
  ],
  dates: [
    assaig.datahora_inici,
    ...(assaig.datahora_final ? [assaig.datahora_final] : []),
  ],
});

export const searchFilterMoviment = (moviment: Moviment): SearchFilters => ({
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

export const searchFilterProjecte = (projecte: Projecte): SearchFilters => ({
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

export const searchFilterVeus = (veu: Veu): SearchFilters => ({
  texts: [veu.nom, veu.abreviatura],
});
