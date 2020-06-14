import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [idiomes, setIdiomes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAPI(
      "/api/obres/idiomes",
      (idiomes) => {
        setIdiomes(idiomes);
        setLoading(false);
      },
      dispatch
    );
  }, [dispatch]);

  return [idiomes, loading];
};
