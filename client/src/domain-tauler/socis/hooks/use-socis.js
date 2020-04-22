import { useEffect, useState } from "react";

export default () => {
  const [socis, setSocis] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSocis();
  }, []);

  const getSocis = (next) => {
    setLoading(true);
    fetch("/api/socis")
      .then((response) => response.json())
      .then((data) => {
        setSocis(data);
        setLoading(false);
        if (typeof next === "function") next();
      });
  };

  return [socis, loading, getSocis];
};
