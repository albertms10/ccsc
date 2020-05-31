import { useDispatch } from "react-redux";
import { fetchAPI, showDeleteConfirm } from "../../../helpers";

export default (callback) => {
  const dispatch = useDispatch();

  const handleEliminar = (id) =>
    fetchAPI(
      `/api/socis/${id}`,
      () => {
        if (typeof callback === "function") callback();
      },
      dispatch,
      { method: "DELETE" }
    );

  return [(id) => showDeleteConfirm("el soci", () => handleEliminar(id))];
};
