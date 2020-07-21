import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI, showDeleteConfirm } from "./index";

export default (url: string, textualElement: string, callback: Function) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const deleteData = useCallback(
    (id) => {
      setLoading(true);
      return fetchAPI(
        `${url}/${id}`,
        () => {
          setLoading(false);
          if (typeof callback === "function") callback();
        },
        dispatch,
        {
          method: "DELETE",
        }
      );
    },
    [url, callback, dispatch]
  );

  return [
    loading,
    (id: number) =>
      showDeleteConfirm(textualElement || "l’ítem", () => deleteData(id)),
  ] as const;
};
