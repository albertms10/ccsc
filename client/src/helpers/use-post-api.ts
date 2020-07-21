import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "./index";

export default (url: string) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const postData = useCallback(
    (data) => {
      setLoading(true);
      return fetchAPI(url, () => setLoading(false), dispatch, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    [url, dispatch]
  );

  return [loading, postData] as const;
};
