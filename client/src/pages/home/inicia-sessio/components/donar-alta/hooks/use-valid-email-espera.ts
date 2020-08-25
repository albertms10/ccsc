import {
  EmailEsperaBaseResponse,
  EmailEsperaFailureResponse,
  EmailEsperaSuccessResponse,
} from "common";
import { useFetchAPI } from "helpers";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { validatedInWaitingList } from "store/user/actions";

export default () => {
  const dispatch = useDispatch();

  const fetchAPI = useFetchAPI();

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const checkEmail = useCallback(
    (email: string) => {
      setLoading(true);

      return fetchAPI<EmailEsperaSuccessResponse | EmailEsperaFailureResponse>(
        "/auth/email-espera",
        (data) => {
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
        { method: "POST", body: JSON.stringify({ email }) }
      ).finally(() => setLoading(false));
    },
    [fetchAPI, dispatch, history]
  );

  return [checkEmail, loading, alertMessage] as const;
};
