import { useEffect, useState } from "react";

export default () => {
  const [textProteccioDades, setTextProteccioDades] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/associacio/proteccio-dades")
      .then((res) => res.json())
      .then((data) => {
        setTextProteccioDades(data);
        setLoading(false);
      });
  }, []);

  return [textProteccioDades, loading];
};
