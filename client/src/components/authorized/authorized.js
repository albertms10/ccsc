import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  isAdmin,
  isDirectorMusical,
  isJuntaDirectiva,
} from "../../helpers/role-checker";

const Authorized = ({ render, component, ...rest }) => {
  const { authority, children } = rest;
  const { roles } = useSelector(({ user }) => user.currentUser);

  const returnItem = render ? render(rest) : component ? component : children;

  switch (authority) {
    case "juntaDirectiva":
      return isJuntaDirectiva(roles) ? returnItem : "";

    case "directorMusical":
      return isDirectorMusical(roles) ? returnItem : "";

    case "admin":
      return isAdmin(roles) ? returnItem : "";

    default:
      return "";
  }
};

const AUTHORITY_TYPES = ["juntaDirectiva", "directorMusical", "admin"];

Authorized.propTypes = {
  render: PropTypes.func,
  component: PropTypes.elementType,
  authority: PropTypes.oneOf(AUTHORITY_TYPES),
};

Authorized.defaultProps = {
  authority: AUTHORITY_TYPES[0],
};

export default Authorized;
