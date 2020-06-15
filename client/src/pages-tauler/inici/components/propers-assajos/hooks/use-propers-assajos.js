import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const { id_persona } = useSelector(({ user }) => user.currentUser);
  const [propersAssajos, setPropersAssajos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAPI(
      `/api/socis/${id_persona}/propers-assajos`,
      (assajos) => {
        setPropersAssajos(assajos);
        setLoading(false);
      },
      dispatch
    );
  }, [id_persona, dispatch]);

  return [propersAssajos, loading];
};
