import { useFetchAPI } from "helpers";
import { Convocatoria } from "model";
import { useCallback, useState } from "react";

export default (idEsdeveniment: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const putAssistentEsdeveniment = useCallback(
    (assistent: Convocatoria) => {
      setLoading(true);

      return fetchAPI(
        `/esdeveniments/${idEsdeveniment}/assistents/${assistent.id_persona}`,
        null,
        {
          method: "PUT",
          body: JSON.stringify(assistent),
        }
      ).finally(() => setLoading(false));
    },
    [fetchAPI, idEsdeveniment]
  );

  return [loading, putAssistentEsdeveniment] as const;
};
