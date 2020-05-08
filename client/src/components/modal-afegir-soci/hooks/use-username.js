import { useState } from "react";
import { generateUsername } from "../../../utils";
import { fetchAPI } from "../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [loadingUsername, setLoadingUsername] = useState(false);

  const getUsername = ({ nom, cognoms }) => {
    setLoadingUsername(true);

    const username = generateUsername(nom, cognoms);

    fetchAPI(
      `/api/usuaris/${username}/first-available-num`,
      (count) => {
        setUsername((username) => `${username}${count > 0 ? count : ""}`);
        setLoadingUsername(false);
      },
      dispatch
    );
  };

  return [username, loadingUsername, getUsername];
};
