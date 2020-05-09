import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id_agrupacio) => {
  const dispatch = useDispatch();
  const [integrants, setIntegrants] = useState([]);
  const [loadingIntegrants, setLoadingIntegrants] = useState(false);

  useEffect(() => {
    setLoadingIntegrants(true);

    fetchAPI(
      `/api/agrupacions/${id_agrupacio}/integrants`,
      (data) => {
        setIntegrants(data);
        setLoadingIntegrants(false);
      },
      dispatch
    );
  }, [id_agrupacio, dispatch]);

  return [integrants, loadingIntegrants];
};
