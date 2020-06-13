import { useDispatch } from "react-redux";
import { fetchAPI, showDeleteConfirm } from "../../../../../helpers";
import { fetchObres } from "../../../../../redux/obres/obres-actions";

export default () => {
  const dispatch = useDispatch();

  const handleEliminar = (id) =>
    fetchAPI(`/api/obres/${id}`, () => dispatch(fetchObres()), dispatch, {
      method: "DELETE",
    });

  return [(id) => showDeleteConfirm("l’obra", () => handleEliminar(id))];
};
