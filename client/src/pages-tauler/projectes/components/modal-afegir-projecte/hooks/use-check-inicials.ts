import { useState } from "react";
import { useFetchAPI } from "../../../../../helpers";

export default () => {
  const fetchAPI = useFetchAPI();

  const [disponible, setDisponible] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkInicials = (inicials: string) => {
    setLoading(true);
    fetchAPI<boolean>(`/projectes/check-inicials/${inicials}`, (disponible) => {
      setDisponible(disponible as boolean);
      setLoading(false);
    });
  };

  return [disponible, loading, checkInicials] as const;
};
