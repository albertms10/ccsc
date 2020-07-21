import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "./index";

export default <T>(url: string, initialState: T) => {
  const dispatch = useDispatch();

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setLoading(true);
    return fetchAPI<T>(
      url,
      (data) => {
        setData(data);
        setLoading(false);
      },
      dispatch
    );
  }, [url, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [data, loading, getData] as const;
};
