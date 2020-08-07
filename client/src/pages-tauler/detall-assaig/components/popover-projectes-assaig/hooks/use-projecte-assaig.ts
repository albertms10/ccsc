import { BaseProjecteTreballat } from "model";
import { useState } from "react";
import { useFetchAPI } from "../../../../../helpers";

export default (idAssaig: number) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const changeProjecteAssaig = (projecte: BaseProjecteTreballat) => {
    setLoading(true);

    return projecte.treballat
      ? fetchAPI(`/assajos/${idAssaig}/projectes`, () => setLoading(false), {
          method: "POST",
          body: JSON.stringify(projecte),
        })
      : fetchAPI(
          `/assajos/${idAssaig}/projectes/${projecte.id_projecte}`,
          () => setLoading(false),
          { method: "DELETE" }
        );
  };

  return [loading, changeProjecteAssaig] as const;
};
