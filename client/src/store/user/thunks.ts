import { message } from "antd";
import { baseFetchAPI } from "helpers/use-fetch-api";
import LogRocket from "logrocket";
import { AppThunkAction } from "../types";
import { logoutUser, signinUserFailure, signinUserSuccess } from "./actions";
import { SignInUser, UserResponse } from "./types";

export const signinUserFetch = (user: SignInUser): AppThunkAction => (
  dispatch
) => {
  baseFetchAPI<UserResponse>(
    "/auth/sign-in",
    ({ user, accessToken }) => {
      LogRocket.identify(user.id_usuari.toString(), {
        name: `${user.nom} ${user.cognoms}`,
        roles: user.roles.join(", "),
      });

      localStorage.setItem("access-token", accessToken);
      dispatch(signinUserSuccess(user));
    },
    (error) => {
      dispatch(signinUserFailure(error));
      message.error(error.message);
    },
    { method: "POST", body: JSON.stringify(user) }
  );
};

/**
 * Fetches the API for a given JWT access token in `localStorage`.
 */
export const getProfileFetch = (): AppThunkAction => (dispatch) => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken)
    baseFetchAPI<UserResponse>(
      "/auth/user",
      ({ user }) => {
        dispatch(signinUserSuccess(user));
      },
      (error) => {
        dispatch(signinUserFailure(error));
        localStorage.removeItem("access-token");
        message.error(error.message);
      }
    );

  return Promise.resolve();
};

/**
 * Removes the JWT access token from the localStorage
 * and dispatches the user logout action.
 */
export const logoutRemoveUser = (): AppThunkAction => (dispatch) => {
  localStorage.removeItem("access-token");
  dispatch(logoutUser());
};
