import { useSelector } from "react-redux";
import {
  isDirectorMusical,
  isJuntaDirectiva,
  isAdmin,
} from "../../helpers/role-checker";

/**
 * @param props
 * @param {'juntaDirectiva' | 'directorMusical' | 'admin'} props.authority
 * @param props.render
 * @param props.component
 * @param props.children
 * @returns {*}
 */
export default (props) => {
  const { authority = "juntaDirectiva", render, component, children } = props;
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
