import { useDispatch } from "react-redux";
import { fetchAPI, showDeleteConfirm } from "../../../helpers";
import { fetchSocis } from "../../../redux/socis/socis-actions";

export default () => {
  const dispatch = useDispatch();

  const handleEliminar = (id) =>
    fetchAPI(`/api/socis/${id}`, () => dispatch(fetchSocis()), dispatch, {
      method: "DELETE",
    });

  return [(id) => showDeleteConfirm("el soci", () => handleEliminar(id))];
};
