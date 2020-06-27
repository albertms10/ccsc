import PropTypes from "prop-types";
import { IdPropTypes } from "./index";

export default PropTypes.shape({
  id_projecte: IdPropTypes,
  titol: PropTypes.string,
  inicials: PropTypes.string,
  color: PropTypes.string,
});
