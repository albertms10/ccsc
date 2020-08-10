import { Convocatoria } from "model";
import { useCallback, useState } from "react";
import { useFetchAPI } from "../../../helpers";

export default (idEsdeveniment: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const putAssistentEsdeveniment = useCallback(
    (assistent: Convocatoria) => {
      setLoading(true);

      return fetchAPI(
        `/esdeveniments/${idEsdeveniment}/assistents`,
        () => setLoading(false),
        { method: "PUT", body: JSON.stringify(assistent) }
      );
    },
    [fetchAPI, idEsdeveniment]
  );

  return [loading, putAssistentEsdeveniment] as const;
};
