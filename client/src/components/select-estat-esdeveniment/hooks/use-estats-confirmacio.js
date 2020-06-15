import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [estats, setEstats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAPI(
      "/api/esdeveniments/estats-confirmacio",
      (estats) => {
        setEstats(estats);
        setLoading(false);
      },
      dispatch
    );
  }, [dispatch]);

  return [estats, loading];
};
