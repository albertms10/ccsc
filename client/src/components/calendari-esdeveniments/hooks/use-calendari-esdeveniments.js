import { useEffect, useState } from 'react';

export default () => {
  const [esdeveniments, setEsdeveniments] = useState([]);

  useEffect(() => {
    fetch('/api/esdeveniments')
      .then(res => res.json())
      .then(data => setEsdeveniments(data));
  }, []);

  return esdeveniments;
}
