import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id_formacio) => {
  const dispatch = useDispatch();
  const [concerts, setConcerts] = useState([]);
  const [loadingConcerts, setLoadingConcerts] = useState(false);

  useEffect(() => {
    setLoadingConcerts(true);

    fetchAPI(
      `/api/formacions/${id_formacio}/concerts`,
      (data) => {
        setConcerts(data);
        setLoadingConcerts(false);
      },
      dispatch
    );
  }, [id_formacio, dispatch]);

  return [concerts, loadingConcerts];
};
