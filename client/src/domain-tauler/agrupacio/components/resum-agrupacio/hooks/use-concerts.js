import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id_agrupacio) => {
  const dispatch = useDispatch();
  const [concerts, setConcerts] = useState([]);
  const [loadingConcerts, setLoadingConcerts] = useState(false);

  useEffect(() => {
    setLoadingConcerts(true);

    fetchAPI(
      `/api/agrupacions/${id_agrupacio}/concerts`,
      (data) => {
        setConcerts(data);
        setLoadingConcerts(false);
      },
      dispatch
    );
  }, [id_agrupacio, dispatch]);

  return [concerts, loadingConcerts];
};
