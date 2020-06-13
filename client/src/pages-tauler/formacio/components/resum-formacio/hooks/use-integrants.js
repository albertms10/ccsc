import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id_formacio) => {
  const dispatch = useDispatch();
  const [integrants, setIntegrants] = useState([]);
  const [loadingIntegrants, setLoadingIntegrants] = useState(false);

  useEffect(() => {
    setLoadingIntegrants(true);

    fetchAPI(
      `/api/formacions/${id_formacio}/integrants`,
      (data) => {
        setIntegrants(data);
        setLoadingIntegrants(false);
      },
      dispatch
    );
  }, [id_formacio, dispatch]);

  return [integrants, loadingIntegrants];
};
