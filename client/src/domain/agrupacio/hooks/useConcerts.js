import { useEffect, useState } from 'react';

export default (id_agrupacio) => {
  const [concerts, setConcerts] = useState([]);
  const [loadingConcerts, setLoadingConcerts] = useState(false);

  useEffect(() => {
    setLoadingConcerts(true);

    fetch(`/api/agrupacions/${id_agrupacio}/concerts`)
      .then(res => res.json())
      .then(data => {
        setConcerts(data);
        setLoadingConcerts(false);
      });
  }, [id_agrupacio]);

  return [concerts, loadingConcerts];
}
