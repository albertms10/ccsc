import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  isAdmin,
  isDirectorMusical,
  isJuntaDirectiva,
} from "../../helpers/role-checker";

const AUTHORITY_TYPES = ["juntaDirectiva", "directorMusical", "admin"];

const Authorized = ({
  render,
  component,
  elseElement,
  authority = AUTHORITY_TYPES[0],
  children,
}) => {
  const { roles } = useSelector(({ user }) => user.currentUser);

  const returnItem = render
    ? render({ authority, children })
    : component
    ? component
    : children;

  switch (authority) {
    case "juntaDirectiva":
      return isJuntaDirectiva(roles) ? returnItem : elseElement || "";

    case "directorMusical":
      return isDirectorMusical(roles) ? returnItem : elseElement || "";

    case "admin":
      return isAdmin(roles) ? returnItem : elseElement || "";

    default:
      return elseElement || "";
  }
};

Authorized.propTypes = {
  render: PropTypes.func,
  component: PropTypes.elementType,
  authority: PropTypes.oneOf(AUTHORITY_TYPES),
  elseElement: PropTypes.node,
};

export default Authorized;
