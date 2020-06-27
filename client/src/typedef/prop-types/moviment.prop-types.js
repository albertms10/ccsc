import PropTypes from "prop-types";
import { IdPropTypes } from "./index";

export default PropTypes.shape({
  id_moviment: IdPropTypes,
  titol_moviment: PropTypes.string,
  titol_obra: PropTypes.string,
  durada: PropTypes.string,
})
