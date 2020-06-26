import PropTypes from "prop-types";
import {
  FormacioPropTypes,
  MovimentPropTypes,
  ProjectePropTypes,
} from "./index";

export default PropTypes.shape({
  id_assaig: PropTypes.any,
  titol: PropTypes.string,
  data_inici: PropTypes.string,
  dia_inici: PropTypes.string,
  hora_inici: PropTypes.string,
  dia_final: PropTypes.string,
  hora_final: PropTypes.string,
  estat_esdeveniment: PropTypes.string,
  id_estat_esdeveniment: PropTypes.string,
  projectes: PropTypes.arrayOf(ProjectePropTypes),
  formacions: PropTypes.arrayOf(FormacioPropTypes),
  moviments: PropTypes.arrayOf(MovimentPropTypes),
});
