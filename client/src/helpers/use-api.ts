import { useCallback, useEffect, useState } from "react";
import { useFetchAPI } from "./index";

export default <T>(url: string, initialState: T) => {
  const fetchAPI = useFetchAPI();

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(
    (controller?: AbortController) => {
      setLoading(true);

      return fetchAPI<T>(
        url,
        (data) => {
          if (!controller || (controller && !controller.signal.aborted))
            setData(data as T);
        },
        ...(controller ? [{ signal: controller.signal }] : [])
      ).finally(() => {
        if (!controller || (controller && !controller.signal.aborted))
          setLoading(false);
      });
    },
    [fetchAPI, url]
  );

  useEffect(() => {
    const controller = new AbortController();

    getData(controller);

    return () => {
      controller.abort();
    };
  }, [getData]);

  return [data, loading, getData] as const;
};
