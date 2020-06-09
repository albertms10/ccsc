import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [disponible, setDisponible] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkInicials = (inicials) => {
    setLoading(true);
    fetchAPI(
      `/api/projectes/check-inicials/${inicials}`,
      (disponible) => {
        setDisponible(disponible);
        setLoading(false);
      },
      dispatch
    );
  };

  return [disponible, loading, checkInicials];
};
