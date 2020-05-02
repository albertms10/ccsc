import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";

export default () => {
  const [countSocis, setCountSocis] = useState({});

  useEffect(() => {
    fetchAPI("/api/socis/count", (data) => setCountSocis(data[0]));
  }, []);

  return [countSocis];
};
