import PropTypes from "prop-types";

export const IdPropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

export const AcceptacioPropTypes = PropTypes.shape({
  titol: PropTypes.string,
  descripcio: PropTypes.string,
  form_name: PropTypes.string,
  requerida: PropTypes.bool,
});

export const AcceptacionsSociPropTypes = PropTypes.objectOf(PropTypes.bool);

export const FormacioPropTypes = PropTypes.shape({
  id_formacio: IdPropTypes,
  nom: PropTypes.string,
  nom_curt: PropTypes.string,
  descripcio: PropTypes.string,
  num_persones: PropTypes.number,
  tipus_formacio: PropTypes.string,
});

export const MovimentPropTypes = PropTypes.shape({
  id_moviment: IdPropTypes,
  titol_moviment: PropTypes.string,
  titol_obra: PropTypes.string,
  durada: PropTypes.string,
});

export const ProjectePropTypes = PropTypes.shape({
  id_projecte: IdPropTypes,
  titol: PropTypes.string,
  inicials: PropTypes.string,
  color: PropTypes.string,
});

export const SociPropTypes = PropTypes.shape({
  id_persona: IdPropTypes,
  nom: PropTypes.string,
  cognoms: PropTypes.string,
  nom_complet: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  telefon: PropTypes.string,
  estat_actiu: PropTypes.bool,
  data_actiu: PropTypes.string,
  data_inactiu: PropTypes.string,
  dies_activitat: PropTypes.number,
  dies_inactivitat: PropTypes.number,
  roles: PropTypes.arrayOf(PropTypes.string),
});

export const AssaigPropTypes = PropTypes.shape({
  id_assaig: IdPropTypes,
  titol: PropTypes.string,
  data_inici: PropTypes.string,
  dia_inici: PropTypes.string,
  hora_inici: PropTypes.string,
  dia_final: PropTypes.string,
  hora_final: PropTypes.string,
  estat_esdeveniment: PropTypes.string,
  id_estat_esdeveniment: IdPropTypes,
  projectes: PropTypes.arrayOf(ProjectePropTypes),
  formacions: PropTypes.arrayOf(FormacioPropTypes),
  moviments: PropTypes.arrayOf(MovimentPropTypes),
});

export const EsdevenimentPropTypes = PropTypes.shape({
  id_esdeveniment: IdPropTypes,
  data_inici: PropTypes.string,
  dia_inici: PropTypes.string,
  hora_inici: PropTypes.string,
  data_final: PropTypes.string,
  dia_final: PropTypes.string,
  hora_final: PropTypes.string,
  id_estat_esdeveniment: IdPropTypes,
  id_estat_localitzacio: IdPropTypes,
  estat_esdeveniment: PropTypes.string,
  estat_localitzacio: PropTypes.string,
  localitzacio: PropTypes.string,
  establiment: PropTypes.string,
  id_esdeveniment_ajornat: IdPropTypes,
  titol: PropTypes.string,
  projectes: PropTypes.arrayOf(ProjectePropTypes),
  tipus: PropTypes.string,
  notes: PropTypes.string,
});
