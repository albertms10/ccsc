import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const postVeuAssaig = (veu) => {
    setLoading(true);
    return fetchAPI(`/api/assajos/${id}/veus`, () => setLoading(false), dispatch, {
      method: "POST",
      body: JSON.stringify(veu),
    });
  };

  return [loading, postVeuAssaig];
};
