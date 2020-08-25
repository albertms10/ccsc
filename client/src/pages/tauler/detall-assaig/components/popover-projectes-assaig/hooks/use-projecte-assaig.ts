import { useFetchAPI } from "helpers";
import { BaseProjecteTreballat } from "model";
import { useCallback, useState } from "react";

export default (idAssaig: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const changeProjecteAssaig = useCallback(
    (projecte: BaseProjecteTreballat) => {
      setLoading(true);

      return (projecte.treballat
        ? fetchAPI(`/assajos/${idAssaig}/projectes`, null, {
            method: "POST",
            body: JSON.stringify(projecte),
          })
        : fetchAPI(
            `/assajos/${idAssaig}/projectes/${projecte.id_projecte}`,
            null,
            { method: "DELETE" }
          )
      ).finally(() => setLoading(false));
    },
    [fetchAPI, idAssaig]
  );

  return [loading, changeProjecteAssaig] as const;
};
