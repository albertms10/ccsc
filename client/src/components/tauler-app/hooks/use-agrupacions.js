import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default () => {
  const [agrupacions, setAgrupacions] = useState([]);
  const [loadingAgrupacions, setLoadingAgrupacions] = useState(false);
  const { id: id_usuari } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setLoadingAgrupacions(true);

    fetch(`/api/usuaris/${id_usuari}/agrupacions`)
      .then((res) => res.json())
      .then((data) => {
        setAgrupacions(data);
        setLoadingAgrupacions(false);
      });
  }, [id_usuari]);

  return [agrupacions, loadingAgrupacions];
};
