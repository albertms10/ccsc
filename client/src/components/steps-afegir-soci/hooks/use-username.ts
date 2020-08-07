import { NomPila } from "model";
import { useState } from "react";
import { useFetchAPI } from "../../../helpers";
import { generateUsername } from "../../../utils";

export default () => {
  const fetchAPI = useFetchAPI();

  const [username, setUsername] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);

  const getUsername = ({ nom, cognoms }: NomPila) => {
    setLoadingUsername(true);

    const username = generateUsername(nom, cognoms);

    fetchAPI<number>(`/usuaris/${username}/first-available-num`, (count) => {
      setUsername(`${username}${count > 0 ? count : ""}`);
      setLoadingUsername(false);
    });
  };

  return [username, loadingUsername, getUsername] as const;
};
