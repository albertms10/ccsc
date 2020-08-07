import { BaseFormacio } from "model";
import { useState } from "react";
import { useFetchAPI } from "../../../../../helpers";

export default (idFormacio: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const changeFormacioAssaig = (formacio: BaseFormacio) => {
    setLoading(true);

    return formacio.convocada
      ? fetchAPI(`/assajos/${idFormacio}/formacions`, () => setLoading(false), {
          method: "POST",
          body: JSON.stringify(formacio),
        })
      : fetchAPI(
          `/assajos/${idFormacio}/formacions/${formacio.id_formacio}`,
          () => setLoading(false),
          { method: "DELETE" }
        );
  };

  return [loading, changeFormacioAssaig] as const;
};
