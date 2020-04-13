import { useEffect, useState } from 'react';

export default () => {
  const [agrupacions, setAgrupacions] = useState([]);
  const [loadingAgrupacions, setLoadingAgrupacions] = useState(false);

  useEffect(() => {
    setLoadingAgrupacions(true);

    fetch("/api/associacio/agrupacions")
      .then((res) => res.json())
      .then((data) => {
        setAgrupacions(data);
        setLoadingAgrupacions(false);
      });
  }, []);

  return [agrupacions, loadingAgrupacions];
};
