import { useSelector } from "react-redux";
import {
  isDirectorMusical,
  isJuntaDirectiva,
  isAdmin,
} from "../../helpers/role-checker";

/**
 * @param props
 * @param {'juntaDirectiva' | 'directorMusical' | 'admin'} props.authority
 * @param props.children
 * @returns {*}
 */
export default ({ authority = "juntaDirectiva", children }) => {
  const { roles } = useSelector(({ user }) => user.currentUser);

  switch (authority) {
    case "juntaDirectiva":
      return isJuntaDirectiva(roles) ? children : "";

    case "directorMusical":
      return isDirectorMusical(roles) ? children : "";

    case "admin":
      return isAdmin(roles) ? children : "";

    default:
      return "";
  }
};
