import { Convocatoria } from "model";
import { useState } from "react";
import { useFetchAPI } from "../../../helpers";

export default (idEsdeveniment: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const putAssistentEsdeveniment = (assistent: Convocatoria) =>
    fetchAPI(
      `/esdeveniments/${idEsdeveniment}/assistents`,
      () => setLoading(false),
      { method: "PUT", body: JSON.stringify(assistent) }
    );

  return [loading, putAssistentEsdeveniment] as const;
};
