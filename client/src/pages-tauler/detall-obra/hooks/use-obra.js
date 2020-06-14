import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [obra, setObra] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAPI(
      `/api/obres/${id}`,
      (obra) => {
        setObra(obra);
        setLoading(false);
      },
      dispatch
    );
  }, [id, dispatch]);

  return [obra, loading];
};
