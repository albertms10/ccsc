import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [countConcerts, setCountConcerts] = useState(0);

  useEffect(() => {
    fetchAPI("/api/concerts/count", setCountConcerts, dispatch);
  }, [dispatch]);

  return [countConcerts];
};
