import PropTypes from "prop-types";

export default PropTypes.shape({
  id_agrupacio: PropTypes.number.isRequired,
  nom: PropTypes.string.isRequired,
  nom_curt: PropTypes.string,
  descripcio: PropTypes.string,
  num_persones: PropTypes.number,
  tipus_agrupacio: PropTypes.string.isRequired,
})
