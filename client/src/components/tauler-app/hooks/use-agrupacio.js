import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [agrupacio, setAgrupacio] = useState("");

  useEffect(() => {
    fetchAPI("/api/agrupacio", setAgrupacio, dispatch);
  }, [dispatch]);

  return [agrupacio];
};
