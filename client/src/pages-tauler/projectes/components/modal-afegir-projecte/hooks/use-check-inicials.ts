import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default () => {
  const dispatch = useDispatch();

  const [disponible, setDisponible] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkInicials = (inicials: string) => {
    setLoading(true);
    fetchAPI<boolean>(
      `/projectes/check-inicials/${inicials}`,
      (disponible) => {
        setDisponible(disponible as boolean);
        setLoading(false);
      },
      dispatch
    );
  };

  return [disponible, loading, checkInicials] as const;
};
