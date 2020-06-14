import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [veus, setVeus] = useState([]);
  const [loading, setLoading] = useState(false);

  const getVeus = useCallback(() => {
    fetchAPI(
      `/api/assajos/${id}/veus`,
      (veus) => {
        setVeus(veus);
        setLoading(false);
      },
      dispatch
    );
  }, [id, dispatch]);

  useEffect(() => {
    setLoading(true);
    getVeus();
  }, [getVeus]);

  return [veus, loading, getVeus];
};
