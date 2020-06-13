import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [formacions, setFormacions] = useState([]);
  const [loadingFormacions, setLoadingFormacions] = useState(false);
  const { id_persona } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setLoadingFormacions(true);

    fetchAPI(
      `/api/socis/${id_persona}/formacions`,
      (data) => {
        setFormacions(data);
        setLoadingFormacions(false);
      },
      dispatch
    );
  }, [id_persona, dispatch]);

  return [formacions, loadingFormacions];
};
