import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [countProjectes, setCountProjectes] = useState(0);

  useEffect(() => {
    fetchAPI("/api/projectes/count", setCountProjectes, dispatch);
  }, [dispatch]);

  return [countProjectes];
};
