import PropTypes from "prop-types";

export default PropTypes.shape({
  id_persona: PropTypes.number.isRequired,
  nom: PropTypes.string.isRequired,
  cognoms: PropTypes.string.isRequired,
  nom_complet: PropTypes.string.isRequired,
  username: PropTypes.string,
  email: PropTypes.string.isRequired,
  telefon: PropTypes.string,
  estat_actiu: PropTypes.bool,
  data_actiu: PropTypes.string,
  data_inactiu: PropTypes.string,
  dies_activitat: PropTypes.number,
  dies_inactivitat: PropTypes.number,
});
