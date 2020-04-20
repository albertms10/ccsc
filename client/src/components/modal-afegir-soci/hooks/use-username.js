import { useState } from "react";
import { stripAccents } from "../../../utils";

export default () => {
  const [username, setUsername] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);

  const generateUsername = async ({ nom, cognoms }) => {
    setLoadingUsername(true);

    const username = stripAccents(
      nom
        .split(" ")
        .map((n, i) => (i > 0 ? n[0] : n))
        .join("")
        .toLowerCase() +
        cognoms
          .split(" ")
          .map((n) => (n[0] === n[0].toUpperCase() ? n[0] : ""))
          .join("")
          .toLowerCase()
    );

    await fetch(`/api/usuaris/${username}/first-available-num`)
      .then((res) => res.json())
      .then((data) => {
        const count = data[0] ? parseInt(data[0].first_available_num) : 0;
        setUsername(`${username}${count > 0 ? count : ""}`);
        setLoadingUsername(false);
      });
  };

  return [username, loadingUsername, generateUsername];
};
