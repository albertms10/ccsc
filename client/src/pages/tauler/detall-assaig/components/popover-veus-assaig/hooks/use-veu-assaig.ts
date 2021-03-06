import { useFetchAPI } from "helpers";
import { BaseVeu } from "model";
import { useCallback, useState } from "react";

export default (idAssaig: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const changeVeuAssaig = useCallback(
    (veu: BaseVeu) => {
      setLoading(true);

      return (veu.convocada
        ? fetchAPI(`/assajos/${idAssaig}/veus`, null, {
            method: "POST",
            body: JSON.stringify(veu),
          })
        : fetchAPI(`/assajos/${idAssaig}/veus/${veu.id_veu}`, null, {
            method: "DELETE",
          })
      ).finally(() => setLoading(false));
    },
    [fetchAPI, idAssaig]
  );

  return [loading, changeVeuAssaig] as const;
};
