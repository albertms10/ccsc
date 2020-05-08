import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [countProjectes, setCountProjectes] = useState(0);

  useEffect(() => {
    fetchAPI("/api/projectes/count", setCountProjectes, dispatch);
  }, [dispatch]);

  return [countProjectes];
};
