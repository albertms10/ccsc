import { useEffect, useState } from 'react';

export default (id_agrupacio) => {
  const [assajos, setAssajos] = useState([]);
  const [loadingAssajos, setLoadingAssajos] = useState(false);

  useEffect(() => {
    setLoadingAssajos(true);

    fetch(`/api/agrupacions/${id_agrupacio}/assajos`)
      .then((res) => res.json())
      .then((data) => {
        setAssajos(data);
        setLoadingAssajos(false);
      });
  }, [id_agrupacio]);

  return [assajos, loadingAssajos];
};
