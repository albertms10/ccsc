import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const changeProjecteAssaig = (projecte) => {
    setLoading(true);
    return projecte.checked
      ? fetchAPI(
          `/assajos/${id}/projectes`,
          () => setLoading(false),
          dispatch,
          { method: "POST", body: JSON.stringify(projecte) }
        )
      : fetchAPI(
          `/assajos/${id}/projectes/${projecte.id_projecte}`,
          () => setLoading(false),
          dispatch,
          { method: "DELETE" }
        );
  };

  return [loading, changeProjecteAssaig];
};
