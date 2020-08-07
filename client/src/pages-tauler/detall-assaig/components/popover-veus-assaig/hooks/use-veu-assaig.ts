import { BaseVeu } from "model";
import { useState } from "react";
import { useFetchAPI } from "../../../../../helpers";

export default (idAssaig: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const changeVeuAssaig = (veu: BaseVeu) => {
    setLoading(true);

    return veu.convocada
      ? fetchAPI(`/assajos/${idAssaig}/veus`, () => setLoading(false), {
          method: "POST",
          body: JSON.stringify(veu),
        })
      : fetchAPI(
          `/assajos/${idAssaig}/veus/${veu.id_veu}`,
          () => setLoading(false),
          { method: "DELETE" }
        );
  };

  return [loading, changeVeuAssaig] as const;
};
