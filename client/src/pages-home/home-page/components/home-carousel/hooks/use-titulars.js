import { useEffect, useState } from "react";

export default () => {
  const [titulars, setTitulars] = useState([]);

  useEffect(() => {
    fetch("/api/titulars")
      .then((res) => res.json())
      .then(setTitulars);
  }, []);

  return [titulars];
};
