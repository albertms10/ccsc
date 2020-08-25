import { useCallback, useState } from "react";
import { useDeleteConfirm, useFetchAPI } from "./index";

export default (url: string, textualElement: string, callback?: () => void) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const showDeleteConfirm = useDeleteConfirm();

  const deleteData = useCallback(
    (id) => {
      setLoading(true);

      return fetchAPI(
        `${url}/${id}`,
        () => {
          if (typeof callback === "function") callback();
        },
        { method: "DELETE" }
      ).finally(() => setLoading(false));
    },
    [url, callback, fetchAPI]
  );

  return [
    loading,
    (id: number) =>
      showDeleteConfirm(textualElement || "l’ítem", () => deleteData(id)),
  ] as const;
};
