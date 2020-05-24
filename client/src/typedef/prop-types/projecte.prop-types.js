import PropTypes from "prop-types";

export default PropTypes.shape({
  id_projecte: PropTypes.number.isRequired,
  titol: PropTypes.string.isRequired,
  inicials: PropTypes.string,
  color: PropTypes.string,
});
