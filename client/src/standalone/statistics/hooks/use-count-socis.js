import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [countSocis, setCountSocis] = useState({});

  useEffect(() => {
    fetchAPI("/api/socis/count", setCountSocis, dispatch);
  }, [dispatch]);

  return [countSocis];
};
