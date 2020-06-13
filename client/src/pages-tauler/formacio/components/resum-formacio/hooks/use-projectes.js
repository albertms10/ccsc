import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id_formacio) => {
  const dispatch = useDispatch();
  const [projectes, setProjectes] = useState([]);
  const [loadingProjectes, setLoadingProjectes] = useState(false);

  useEffect(() => {
    setLoadingProjectes(true);

    fetchAPI(
      `/api/formacions/${id_formacio}/projectes`,
      (data) => {
        setProjectes(data);
        setLoadingProjectes(false);
      },
      dispatch
    );
  }, [id_formacio, dispatch]);

  return [projectes, loadingProjectes];
};
