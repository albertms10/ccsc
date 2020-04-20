import { useEffect, useState } from "react";

export default (idSoci) => {
  const [soci, setSoci] = useState({});

  useEffect(() => {
    fetch(`/api/socis/${idSoci}`)
      .then((res) => res.json())
      .then(setSoci);
  }, [idSoci]);

  return [soci];
};
