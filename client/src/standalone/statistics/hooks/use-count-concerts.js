import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [countConcerts, setCountConcerts] = useState(0);

  useEffect(() => {
    fetchAPI("/api/concerts/count", setCountConcerts, dispatch);
  }, [dispatch]);

  return [countConcerts];
};
