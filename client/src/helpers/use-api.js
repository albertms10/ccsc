import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "./index";

export default (url, initialState = []) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(
    () =>
      fetchAPI(
        url,
        (data) => {
          setData(data);
          setLoading(false);
        },
        dispatch
      ),
    [url, dispatch]
  );

  useEffect(() => {
    setLoading(true);
    getData();
  }, [getData]);

  return [data, loading, getData];
};
