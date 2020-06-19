import PropTypes from "prop-types";

export default PropTypes.shape({
  id_formacio: PropTypes.any,
  nom: PropTypes.string,
  nom_curt: PropTypes.string,
  descripcio: PropTypes.string,
  num_persones: PropTypes.number,
  tipus_formacio: PropTypes.string,
});
