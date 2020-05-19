import { useEffect, useState } from "react";

export default () => {
  const [avisProteccioDades, setAvisProteccioDades] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/associacio/proteccio-dades")
      .then((res) => res.json())
      .then((data) => {
        setAvisProteccioDades(data);
        setLoading(false);
      });
  }, []);

  return [avisProteccioDades, loading];
};
