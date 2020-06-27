import PropTypes from "prop-types";
import { IdPropTypes } from "./index";

export default PropTypes.shape({
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
