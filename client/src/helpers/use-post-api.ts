import { useCallback, useState } from "react";
import { useFetchAPI } from "./index";

export default <T>(url: string) => {
  const fetchAPI = useFetchAPI();

  const [loading, setLoading] = useState(false);

  const postData = useCallback(
    (data: T) => {
      setLoading(true);

      return fetchAPI<T>(url, () => setLoading(false), {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    [url, fetchAPI]
  );

  return [loading, postData] as const;
};
