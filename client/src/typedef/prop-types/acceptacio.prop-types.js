import PropTypes from "prop-types";

export default PropTypes.shape({
  titol: PropTypes.string,
  descripcio: PropTypes.string,
  form_name: PropTypes.string.isRequired,
  requerida: PropTypes.bool.isRequired,
})
