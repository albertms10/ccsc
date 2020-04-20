import { useEffect, useState } from "react";

export default () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch("/api/socis/historial")
      .then((res) => res.json())
      .then((data) => setHistorial(data));
  }, []);

  return historial;
};
