import { BaseProjecteTreballat } from "model";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (idAssaig: number) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const changeProjecteAssaig = (projecte: BaseProjecteTreballat) => {
    setLoading(true);
    return projecte.treballat
      ? fetchAPI(
          `/assajos/${idAssaig}/projectes`,
          () => setLoading(false),
          dispatch,
          { method: "POST", body: JSON.stringify(projecte) }
        )
      : fetchAPI(
          `/assajos/${idAssaig}/projectes/${projecte.id_projecte}`,
          () => setLoading(false),
          dispatch,
          { method: "DELETE" }
        );
  };

  return [loading, changeProjecteAssaig] as const;
};
