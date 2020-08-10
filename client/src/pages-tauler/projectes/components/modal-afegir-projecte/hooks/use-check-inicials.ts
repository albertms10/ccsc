import { useCallback, useState } from "react";
import { useFetchAPI } from "../../../../../helpers";

export default () => {
  const fetchAPI = useFetchAPI();

  const [disponible, setDisponible] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkInicials = useCallback(
    (inicials: string) => {
      setLoading(true);

      return fetchAPI<boolean>(
        `/projectes/check-inicials/${inicials}`,
        (disponible) => {
          setDisponible(disponible as boolean);
          setLoading(false);
        }
      );
    },
    [fetchAPI]
  );

  return [disponible, loading, checkInicials] as const;
};
