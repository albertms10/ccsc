import { useFetchAPI } from "helpers";
import { useCallback, useState } from "react";

export default () => {
  const fetchAPI = useFetchAPI();

  const [disponible, setDisponible] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkInicials = useCallback(
    (inicials: string) => {
      setLoading(true);

      return fetchAPI<boolean>(
        `/projectes/check-inicials/${inicials}`,
        setDisponible
      ).finally(() => setLoading(false));
    },
    [fetchAPI]
  );

  return [disponible, loading, checkInicials] as const;
};
