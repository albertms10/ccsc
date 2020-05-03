import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [countSocis, setCountSocis] = useState({});

  useEffect(() => {
    fetchAPI("/api/socis/count", (data) => setCountSocis(data[0]), dispatch);
  }, [dispatch]);

  return [countSocis];
};
