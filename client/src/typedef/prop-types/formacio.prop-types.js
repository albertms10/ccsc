import PropTypes from "prop-types";
import { IdPropTypes } from "./index";

export default PropTypes.shape({
  id_formacio: IdPropTypes,
  nom: PropTypes.string,
  nom_curt: PropTypes.string,
  descripcio: PropTypes.string,
  num_persones: PropTypes.number,
  tipus_formacio: PropTypes.string,
});
