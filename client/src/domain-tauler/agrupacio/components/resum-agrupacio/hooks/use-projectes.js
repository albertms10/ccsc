import { useEffect, useState } from "react";
import { fetchAPI } from "../../../../../helpers";
import { useDispatch } from "react-redux";

export default (id_agrupacio) => {
  const dispatch = useDispatch();
  const [projectes, setProjectes] = useState([]);
  const [loadingProjectes, setLoadingProjectes] = useState(false);

  useEffect(() => {
    setLoadingProjectes(true);

    fetchAPI(
      `/api/agrupacions/${id_agrupacio}/projectes`,
      (data) => {
        setProjectes(data);
        setLoadingProjectes(false);
      },
      dispatch
    );
  }, [id_agrupacio, dispatch]);

  return [projectes, loadingProjectes];
};
