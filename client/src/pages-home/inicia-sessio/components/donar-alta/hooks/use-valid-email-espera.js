import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { validatedInWaitingList } from "../../../../../redux";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const checkEmail = (email) => {
    setLoading(true);
    fetch("/api/auth/email-espera", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then(({ exists, message, accessToken }) => {
        setLoading(false);
        if (exists) {
          localStorage.setItem("access-token", accessToken);
          dispatch(validatedInWaitingList(email));
          history.push("/donar-alta/formulari");
        } else if (message) {
          setAlertMessage(message);
        }
      });
  };

  return [checkEmail, loading, alertMessage];
};
