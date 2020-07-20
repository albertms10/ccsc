import { useDispatch } from "react-redux";
import { fetchAPI, showDeleteConfirm } from "../../../../../helpers";
import { fetchAssajos } from "../../../../../store/assajos/thunks";

export default () => {
  const dispatch = useDispatch();

  const handleEliminar = (id) =>
    fetchAPI(`/assajos/${id}`, () => dispatch(fetchAssajos()), dispatch, {
      method: "DELETE",
    });

  return [(id) => showDeleteConfirm("l’assaig", () => handleEliminar(id))];
};
