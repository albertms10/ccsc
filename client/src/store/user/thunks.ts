import { ResponseError } from "common";
import LogRocket from "logrocket";
import { fetchAPI } from "../../helpers";
import { AppThunkAction } from "../types";
import { logoutUser, signinUserFailure, signinUserSuccess } from "./actions";
import { SignInUser, UserResponse } from "./types";

export const signinUserFetch = (user: SignInUser): AppThunkAction => (
  dispatch
) => {
  fetchAPI<UserResponse>(
    "/auth/sign-in",
    (data) => {
      if (data.hasOwnProperty("error")) {
        dispatch(signinUserFailure((data as ResponseError).error));
      } else {
        const { user, accessToken } = data as UserResponse;

        LogRocket.identify(user.id_usuari.toString(), {
          name: `${user.nom} ${user.cognoms}`,
          roles: (user.roles as string[]).join(", "),
        });

        localStorage.setItem("access-token", accessToken);
        dispatch(signinUserSuccess(user));
      }
    },
    dispatch,
    { method: "POST", body: JSON.stringify({ user }) }
  );
};

/**
 * Fetches the API for a given JWT access token in `localStorage`.
 */
export const getProfileFetch = (): AppThunkAction => (dispatch) => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    fetchAPI<UserResponse>(
      "/auth/user",
      (data: UserResponse | ResponseError) => {
        if (data.hasOwnProperty("error")) {
          dispatch(signinUserFailure((data as ResponseError).error));
          localStorage.removeItem("access-token");
        } else {
          dispatch(signinUserSuccess((data as UserResponse).user));
        }
      },
      dispatch
    );
  }
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
