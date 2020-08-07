import { useCallback, useEffect, useState } from "react";
import { useFetchAPI } from "./index";

export default <T>(url: string, initialState: T) => {
  const fetchAPI = useFetchAPI();

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setLoading(true);

    return fetchAPI<T>(url, (data) => {
      setData(data as T);
      setLoading(false);
    });
  }, [url, fetchAPI]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [data, loading, getData] as const;
};
