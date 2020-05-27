import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default (id) => {
  const dispatch = useDispatch();
  const [assaig, setAssaig] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAPI(
      `/api/assajos/${id}`,
      (assaig) => {
        setAssaig(assaig);
        setLoading(false);
      },
      dispatch
    );
  }, []);

  return [assaig, loading];
};
