import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "./index";

export default (url: string, initialState = []) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setLoading(true);
    return fetchAPI(
      url,
      (data: any) => {
        setData(data);
        setLoading(false);
      },
      dispatch
    );
  }, [url, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [data, loading, getData];
};
