import { useFetchAPI } from "helpers";
import { BaseFormacio } from "model";
import { useCallback, useState } from "react";

export default (idFormacio: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const changeFormacioAssaig = useCallback(
    (formacio: BaseFormacio) => {
      setLoading(true);

      return formacio.convocada
        ? fetchAPI(
            `/assajos/${idFormacio}/formacions`,
            () => setLoading(false),
            {
              method: "POST",
              body: JSON.stringify(formacio),
            }
          )
        : fetchAPI(
            `/assajos/${idFormacio}/formacions/${formacio.id_formacio}`,
            () => setLoading(false),
            { method: "DELETE" }
          );
    },
    [fetchAPI, idFormacio]
  );

  return [loading, changeFormacioAssaig] as const;
};
