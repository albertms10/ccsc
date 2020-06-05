import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [convocatsAssaig, setConvocatsAssaig] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAPI(
      `/api/assajos/${id}/convocats`,
      (convocats) => {
        setConvocatsAssaig(convocats);
        setLoading(false);
      },
      dispatch
    );
  }, [id, dispatch]);

  return [convocatsAssaig, loading];
};
