import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const putAssistentEsdeveniment = (assistent) =>
    fetchAPI(
      `/esdeveniments/${id}/assistents`,
      () => setLoading(false),
      dispatch,
      { method: "PUT", body: JSON.stringify(assistent) }
    );

  return [loading, putAssistentEsdeveniment];
};
