import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [countSocis, setCountSocis] = useState({});

  useEffect(() => {
    fetchAPI("/api/socis/count", setCountSocis, dispatch);
  }, [dispatch]);

  return [countSocis];
};
