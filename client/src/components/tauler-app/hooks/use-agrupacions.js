import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [agrupacions, setAgrupacions] = useState([]);
  const [loadingAgrupacions, setLoadingAgrupacions] = useState(false);
  const { id: id_usuari } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setLoadingAgrupacions(true);

    fetchAPI(
      `/api/usuaris/${id_usuari}/agrupacions`,
      (data) => {
        setAgrupacions(data);
        setLoadingAgrupacions(false);
      },
      dispatch
    );
  }, [id_usuari, dispatch]);

  return [agrupacions, loadingAgrupacions];
};
