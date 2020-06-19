import PropTypes from "prop-types";

export default PropTypes.shape({
  id_formacio: PropTypes.number.isRequired,
  nom: PropTypes.string.isRequired,
  nom_curt: PropTypes.string,
  descripcio: PropTypes.string,
  num_persones: PropTypes.number,
  tipus_formacio: PropTypes.string,
});
