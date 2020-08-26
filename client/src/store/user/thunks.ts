import { showErrorMessage } from "helpers";
import { baseFetchAPI } from "helpers/use-fetch-api";
import LogRocket from "logrocket";
import { Usuari } from "model";
import { AppThunkAction } from "../types";
import { logoutUser, signinUserFailure, signinUserSuccess } from "./actions";
import { SignInUser } from "./types";

export const signinUserFetch = (user: SignInUser): AppThunkAction => (
  dispatch
) => {
  baseFetchAPI<Usuari>(
    "/auth/sign-in",
    (user) => {
      LogRocket.identify(user.id_usuari.toString(), {
        name: `${user.nom} ${user.cognoms}`,
        roles: user.roles.join(", "),
      });

      dispatch(signinUserSuccess(user));
    },
    (error) => {
      dispatch(signinUserFailure(error));
      showErrorMessage(error.status, error.message);
    },
    { method: "POST", body: JSON.stringify(user) }
  );
};

export const getProfileFetch = (): AppThunkAction => (dispatch) => {
  baseFetchAPI<Usuari>(
    "/auth/user",
    (user) => {
      dispatch(signinUserSuccess(user));
    },
    (error) => {
      dispatch(logoutRemoveUser());
      showErrorMessage(error.status, error.message);
    }
  );
};

export const logoutRemoveUser = (): AppThunkAction => (dispatch) => {
  baseFetchAPI(
    "/auth/sign-out",
    () => dispatch(logoutUser()),
    (error) => {
      showErrorMessage(error.status, error.message);
    },
    { method: "PUT" }
  );
};
