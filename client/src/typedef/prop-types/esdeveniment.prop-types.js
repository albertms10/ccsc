import PropTypes from "prop-types";
import { ProjectePropTypes } from "./index";

export default PropTypes.shape({
  id_esdeveniment: PropTypes.any,
  data_inici: PropTypes.string,
  dia_inici: PropTypes.string,
  hora_inici: PropTypes.string,
  data_final: PropTypes.string,
  dia_final: PropTypes.string,
  hora_final: PropTypes.string,
  id_estat_esdeveniment: PropTypes.any,
  id_estat_localitzacio: PropTypes.any,
  estat_esdeveniment: PropTypes.string,
  estat_localitzacio: PropTypes.string,
  localitzacio: PropTypes.string,
  establiment: PropTypes.string,
  id_esdeveniment_ajornat: PropTypes.any,
  titol: PropTypes.string,
  projectes: PropTypes.arrayOf(ProjectePropTypes),
  tipus: PropTypes.string,
  notes: PropTypes.string,
});
