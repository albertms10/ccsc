import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAPI } from "../../../../../helpers";
import { validatedInWaitingList } from "../../../../../redux";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const checkEmail = (email) => {
    setLoading(true);
    fetchAPI(
      "/auth/email-espera",
      ({ exists, message, accessToken }) => {
        setLoading(false);
        if (exists) {
          localStorage.setItem("access-token", accessToken);
          dispatch(validatedInWaitingList(email));
          history.push("/donar-alta/formulari");
        } else if (message) {
          setAlertMessage(message);
        }
      },
      dispatch,
      { method: "POST", body: JSON.stringify({ email }) }
    );
  };

  return [checkEmail, loading, alertMessage];
};
