import { useState } from "react";
import { generateUsername } from "../../../utils";

export default () => {
  const [username, setUsername] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);

  const getUsername = async ({ nom, cognoms }) => {
    setLoadingUsername(true);

    const username = generateUsername(nom, cognoms);

    await fetch(`/api/usuaris/${username}/first-available-num`)
      .then((res) => res.json())
      .then((data) => {
        const count = data[0] ? parseInt(data[0].first_available_num) : 0;
        setUsername(`${username}${count > 0 ? count : ""}`);
        setLoadingUsername(false);
      });
  };

  return [username, loadingUsername, getUsername];
};
