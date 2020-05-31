import { useDispatch } from "react-redux";
import { fetchAPI, showDeleteConfirm } from "../../../../../helpers";
import { fetchAssajos } from "../../../../../redux/assajos/assajos-actions";

export default () => {
  const dispatch = useDispatch();

  const handleEliminar = (id) =>
    fetchAPI(`/api/assajos/${id}`, () => dispatch(fetchAssajos()), dispatch, {
      method: "DELETE",
    });

  return [(id) => showDeleteConfirm("l’assaig", () => handleEliminar(id))];
};
