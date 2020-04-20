import { useEffect, useState } from "react";

export default (id_agrupacio) => {
  const [esdeveniments, setEsdeveniments] = useState([]);

  useEffect(() => {
    fetch(`/api/agrupacions/${id_agrupacio}/esdeveniments`)
      .then((res) => res.json())
      .then(setEsdeveniments);
  }, [id_agrupacio]);

  return [esdeveniments];
};
