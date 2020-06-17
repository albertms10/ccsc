import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (idObra) => {
  const dispatch = useDispatch();
  const [moviments, setMoviments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMoviments = useCallback(() => {
    setLoading(true);
    fetchAPI(
      `/api/obres/${idObra}/moviments`,
      (moviments) => {
        setMoviments(moviments);
        setLoading(false);
      },
      dispatch
    );
  }, [dispatch, idObra]);

  useEffect(() => {
    getMoviments();
  }, [getMoviments]);

  return [moviments, loading, getMoviments];
};
