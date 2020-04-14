import { useEffect, useState } from "react";

export default (id_agrupacio) => {
  const [projectes, setProjectes] = useState([]);
  const [loadingProjectes, setLoadingProjectes] = useState(false);

  useEffect(() => {
    setLoadingProjectes(true);

    fetch(`/api/agrupacions/${id_agrupacio}/projectes`)
      .then((res) => res.json())
      .then((data) => {
        setProjectes(data);
        setLoadingProjectes(false);
      });
  }, [id_agrupacio]);

  return [projectes, loadingProjectes];
};
