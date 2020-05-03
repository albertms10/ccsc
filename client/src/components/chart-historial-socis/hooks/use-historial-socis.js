import { useEffect, useState } from "react";
import { fetchAPI } from "../../../helpers";

export default () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetchAPI("/api/socis/historial", setHistorial);
  }, []);

  return [historial];
};
