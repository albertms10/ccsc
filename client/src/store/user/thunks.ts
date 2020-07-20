import { ResponseError } from "common";
import { fetchAPI } from "../../helpers";
import { AppThunk } from "../index";
import { logoutUser, signinUserFailure, signinUserSuccess } from "./actions";
import { SignInUser, UserResponse } from "./types";

export const signinUserFetch = (user: SignInUser): AppThunk => (dispatch) => {
  fetchAPI(
    "/auth/sign-in",
    (data: UserResponse | ResponseError) => {
      if (data.hasOwnProperty("error")) {
        dispatch(signinUserFailure((data as ResponseError).error));
      } else {
        localStorage.setItem(
          "access-token",
          (data as UserResponse).accessToken
        );
        dispatch(signinUserSuccess((data as UserResponse).user));
      }
    },
    dispatch,
    { method: "POST", body: JSON.stringify({ user }) }
  );
};

/**
 * Fetches the API for a given JWT access token in `localStorage`.
 */
export const getProfileFetch = (): AppThunk => (dispatch) => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    fetchAPI(
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
export const logoutRemoveUser = (): AppThunk => (dispatch) => {
  localStorage.removeItem("access-token");
  dispatch(logoutUser());
};
