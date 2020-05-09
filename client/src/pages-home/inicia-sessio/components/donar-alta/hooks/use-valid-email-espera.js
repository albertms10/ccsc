import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { validatedInWaitingList } from "../../../../../redux";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      .then((validat) => {
        setLoading(false);
        if (validat) {
          dispatch(validatedInWaitingList());
          history.push("/donar-alta/formulari");
        } else {
          setShowAlert(true);
        }
      });
  };

  return [checkEmail, loading, showAlert];
};
