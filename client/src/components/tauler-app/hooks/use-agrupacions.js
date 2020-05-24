import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [agrupacions, setAgrupacions] = useState([]);
  const [loadingAgrupacions, setLoadingAgrupacions] = useState(false);
  const { id_persona } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setLoadingAgrupacions(true);

    fetchAPI(
      `/api/socis/${id_persona}/agrupacions`,
      (data) => {
        setAgrupacions(data);
        setLoadingAgrupacions(false);
      },
      dispatch
    );
  }, [id_persona, dispatch]);

  return [agrupacions, loadingAgrupacions];
};
