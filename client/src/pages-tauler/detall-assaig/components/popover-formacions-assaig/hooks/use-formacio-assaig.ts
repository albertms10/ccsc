import { BaseFormacio } from "model";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (idFormacio: number) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const changeFormacioAssaig = (formacio: BaseFormacio) => {
    setLoading(true);
    return formacio.convocada
      ? fetchAPI(
          `/assajos/${idFormacio}/formacions`,
          () => setLoading(false),
          dispatch,
          { method: "POST", body: JSON.stringify(formacio) }
        )
      : fetchAPI(
          `/assajos/${idFormacio}/formacions/${formacio.id_formacio}`,
          () => setLoading(false),
          dispatch,
          { method: "DELETE" }
        );
  };

  return [loading, changeFormacioAssaig] as const;
};
