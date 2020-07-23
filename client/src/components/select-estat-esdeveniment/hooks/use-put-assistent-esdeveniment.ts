import { Convocatoria } from "model";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (idEsdeveniment: number) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const putAssistentEsdeveniment = (assistent: Convocatoria) =>
    fetchAPI(
      `/esdeveniments/${idEsdeveniment}/assistents`,
      () => setLoading(false),
      dispatch,
      { method: "PUT", body: JSON.stringify(assistent) }
    );

  return [loading, putAssistentEsdeveniment] as const;
};
