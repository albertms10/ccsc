import { useFetchAPI } from "helpers";
import { NomPila } from "model";
import { useCallback, useState } from "react";
import { generateUsername } from "utils";

export default () => {
  const fetchAPI = useFetchAPI();

  const [username, setUsername] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);

  const getUsername = useCallback(
    ({ nom, cognoms }: NomPila) => {
      setLoadingUsername(true);

      const username = generateUsername(nom, cognoms);

      return fetchAPI<number>(
        `/usuaris/${username}/first-available-num`,
        (count) => {
          setUsername(`${username}${count > 0 ? count : ""}`);
          setLoadingUsername(false);
        }
      );
    },
    [fetchAPI]
  );

  return [username, loadingUsername, getUsername] as const;
};
