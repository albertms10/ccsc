export const searchFilterAssaig = (assaig) => ({
  texts: [
    assaig.titol,
    ...assaig.formacions.map((formacio) => formacio.nom_curt),
    ...assaig.projectes.map((projecte) => projecte.titol),
    ...(assaig.hora_inici ? [] : ["Hora a determinar"]),
  ],
  dates: [assaig.data_inici, ...(assaig.data_final ? [assaig.data_final] : [])],
});

export const searchFilterMoviment = (moviment) => ({
  texts: [
    moviment.titol_obra,
    moviment.titol_moviment,
    moviment.subtitol,
    moviment.num_cataleg,
  ],
});

export const searchFilterProjecte = (projecte) => ({
  texts: [
    projecte.titol,
    projecte.descripcio,
    projecte.any_inici_curs,
    projecte.any_final_curs,
    ...projecte.formacions.map(({ nom }) => nom),
    ...projecte.directors.map(({ nom }) => nom),
  ],
});
