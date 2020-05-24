import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default () => {
  const { id_persona } = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const [assajos, setAssajos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAPI(
      `/api/socis/${id_persona}/assajos`,
      (assajos) => {
        setAssajos(assajos);
        setLoading(false);
      },
      dispatch
    );
  }, [id_persona, dispatch]);

  return [assajos, loading];
};
