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
      (data) => {
        const count = data[0] ? parseInt(data[0].first_available_num) : 0;
        setUsername(`${username}${count > 0 ? count : ""}`);
        setLoadingUsername(false);
      },
      dispatch
    );
  };

  return [username, loadingUsername, getUsername];
};
