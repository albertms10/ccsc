import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id_agrupacio) => {
  const dispatch = useDispatch();
  const [esdeveniments, setEsdeveniments] = useState([]);

  useEffect(() => {
    fetchAPI(
      `/api/agrupacions/${id_agrupacio}/esdeveniments`,
      setEsdeveniments,
      dispatch
    );
  }, [id_agrupacio, dispatch]);

  return [esdeveniments];
};
