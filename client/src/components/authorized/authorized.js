import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  isRoleAdmin,
  isRoleDireccioMusical,
  isRoleJuntaDirectiva,
} from "../../helpers/role-checker";

const AUTHORITY_TYPES = ["junta_directiva", "direccio_musical", "admin"];

const Authorized = ({
  render,
  component,
  elseElement,
  authority = AUTHORITY_TYPES[0],
  children,
  ...rest
}) => {
  const { roles } = useSelector(({ user }) => user.currentUser);

  const returnItem = render
    ? render({ authority, children, ...rest })
    : component
    ? component
    : children;

  switch (authority) {
    case "junta_directiva":
      return isRoleJuntaDirectiva(roles) ? returnItem : elseElement || "";

    case "direccio_musical":
      return isRoleDireccioMusical(roles) ? returnItem : elseElement || "";

    case "admin":
      return isRoleAdmin(roles) ? returnItem : elseElement || "";

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
