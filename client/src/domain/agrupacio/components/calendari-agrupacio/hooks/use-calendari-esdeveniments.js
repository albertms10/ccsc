import { useEffect, useState } from 'react';

export default (id_agrupacio) => {
  const [esdeveniments, setEsdeveniments] = useState([]);

  useEffect(() => {
    fetch(`/api/agrupacions/${id_agrupacio}/esdeveniments`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEsdeveniments(data);
      });
  }, [id_agrupacio]);

  return esdeveniments;
};
