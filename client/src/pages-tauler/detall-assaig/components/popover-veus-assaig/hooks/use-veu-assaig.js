import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const changeVeuAssaig = (veu) => {
    setLoading(true);
    return veu.checked
      ? fetchAPI(`/assajos/${id}/veus`, () => setLoading(false), dispatch, {
          method: "POST",
          body: JSON.stringify(veu),
        })
      : fetchAPI(
          `/assajos/${id}/veus/${veu.id_veu}`,
          () => setLoading(false),
          dispatch,
          { method: "DELETE" }
        );
  };

  return [loading, changeVeuAssaig];
};
