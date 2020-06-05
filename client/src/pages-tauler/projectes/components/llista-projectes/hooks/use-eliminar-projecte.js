import { useDispatch } from "react-redux";
import { fetchAPI, showDeleteConfirm } from "../../../../../helpers";
import { fetchProjectes } from "../../../../../redux/projectes/projectes-actions";

export default () => {
  const dispatch = useDispatch();

  const handleEliminar = (id) =>
    fetchAPI(`/api/projectes/${id}`, () => dispatch(fetchProjectes()), dispatch, {
      method: "DELETE"
    });

  return [(id) => showDeleteConfirm("el projecte", () => handleEliminar(id))];
};
