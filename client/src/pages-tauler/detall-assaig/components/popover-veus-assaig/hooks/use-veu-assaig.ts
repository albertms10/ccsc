import { BaseVeu } from "model";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (idAssaig: number) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const changeVeuAssaig = (veu: BaseVeu) => {
    setLoading(true);
    return veu.convocada
      ? fetchAPI(
          `/assajos/${idAssaig}/veus`,
          () => setLoading(false),
          dispatch,
          {
            method: "POST",
            body: JSON.stringify(veu),
          }
        )
      : fetchAPI(
          `/assajos/${idAssaig}/veus/${veu.id_veu}`,
          () => setLoading(false),
          dispatch,
          { method: "DELETE" }
        );
  };

  return [loading, changeVeuAssaig] as const;
};
