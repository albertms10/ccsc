import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "./index";

export default (url) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteData = useCallback(
    (id) => {
      setLoading(true);
      return fetchAPI(`${url}/${id}`, () => setLoading(false), dispatch, {
        method: "DELETE",
      });
    },
    [url, dispatch]
  );

  return [loading, deleteData];
};
