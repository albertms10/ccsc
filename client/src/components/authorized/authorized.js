import { useSelector } from "react-redux";
import {
  isAdmin,
  isDirectorMusical,
  isJuntaDirectiva,
} from "../../helpers/role-checker";

/**
 * @typedef {'juntaDirectiva' | 'directorMusical' | 'admin'} Authority
 */

export default ({ render, component, ...props }) => {
  const { authority = "juntaDirectiva", children } = props;
  const { roles } = useSelector(({ user }) => user.currentUser);

  const returnItem = render ? render(props) : component ? component : children;

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
