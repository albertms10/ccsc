import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (id_agrupacio) => {
  const dispatch = useDispatch();
  const [assajos, setAssajos] = useState([]);
  const [loadingAssajos, setLoadingAssajos] = useState(false);

  useEffect(() => {
    setLoadingAssajos(true);

    fetchAPI(
      `/api/agrupacions/${id_agrupacio}/assajos`,
      (data) => {
        setAssajos(data);
        setLoadingAssajos(false);
      },
      dispatch
    );
  }, [id_agrupacio, dispatch]);

  return [assajos, loadingAssajos];
};
