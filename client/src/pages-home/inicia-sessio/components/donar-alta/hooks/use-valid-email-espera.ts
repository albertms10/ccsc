import {
  EmailEsperaBaseResponse,
  EmailEsperaFailureResponse,
  EmailEsperaSuccessResponse,
} from "common";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAPI } from "../../../../../helpers";
import { validatedInWaitingList } from "../../../../../store/user/actions";

export default () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const checkEmail = (email: string) => {
    setLoading(true);
    fetchAPI<EmailEsperaSuccessResponse | EmailEsperaFailureResponse>(
      "/auth/email-espera",
      (data) => {
        setLoading(false);
        if ((data as EmailEsperaBaseResponse).exists) {
          localStorage.setItem(
            "access-token",
            (data as EmailEsperaSuccessResponse).accessToken
          );
          dispatch(validatedInWaitingList(email));
          history.push("/donar-alta/formulari");
        } else if ((data as EmailEsperaFailureResponse).message) {
          setAlertMessage((data as EmailEsperaFailureResponse).message);
        }
      },
      dispatch,
      { method: "POST", body: JSON.stringify({ email }) }
    );
  };

  return [checkEmail, loading, alertMessage] as const;
};
