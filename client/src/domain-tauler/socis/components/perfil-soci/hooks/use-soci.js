import { useEffect, useState } from "react";
import { fetchAPI } from "../../../../../helpers";

export default (idSoci) => {
  const [soci, setSoci] = useState({});

  useEffect(() => {
    fetchAPI(`/api/socis/${idSoci}`, setSoci);
  }, [idSoci]);

  return [soci];
};
