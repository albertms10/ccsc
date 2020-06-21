export const searchFilterAssaig = (assaig) => ({
  texts: [
    assaig.titol,
    ...assaig.formacions.map((formacio) => formacio.nom_curt),
    ...assaig.projectes.map((projecte) => projecte.titol),
    ...(assaig.hora_inici ? [] : ["Hora a determinar"]),
  ],
  dates: [assaig.data_inici, ...(assaig.data_final ? [assaig.data_final] : [])],
});
