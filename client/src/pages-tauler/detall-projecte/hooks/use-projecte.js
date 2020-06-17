import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [projecte, setProjecte] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAPI(
      `/api/projectes/${id}`,
      (projecte) => {
        setProjecte(projecte);
        setLoading(false);
      },
      dispatch
    );
  }, [id, dispatch]);

  return [projecte, loading];
};
