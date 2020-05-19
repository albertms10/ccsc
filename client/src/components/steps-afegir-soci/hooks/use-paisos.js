import { useEffect, useState } from "react";

export default () => {
  const [paisos, setPaisos] = useState([]);
  const [loadingPaisos, setLoadingPaisos] = useState(false);

  useEffect(() => {
    setLoadingPaisos(true);
    fetch("/api/localitzacions/paisos")
      .then((res) => res.json())
      .then((data) => {
        setPaisos(data);
        setLoadingPaisos(false);
      });
  }, []);

  return [paisos, loadingPaisos];
};
