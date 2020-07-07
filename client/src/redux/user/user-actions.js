import { fetchAPI } from "../../helpers";
import {
  LOGOUT_USER,
  REMOVE_ACCEPTANCE_NOTICE,
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_SUCCESS,
  VALIDATED_IN_WAITING_LIST,
} from "./user-types";

/**
 * Saves the user information to the Redux store.
 * @param {User} user
 * @returns {ReduxAction}
 */
const signinUserSuccess = (user) => ({
  type: SIGNIN_USER_SUCCESS,
  payload: user,
});

/**
 * Sets the error to the Redux store.
 * @param {SigninError} error
 * @returns {ReduxAction}
 */
const signinUserFailure = (error) => ({
  type: SIGNIN_USER_FAILURE,
  payload: error,
});

/**
 * Sets inWaitingList value to true.
 * @param {string} email
 * @returns {ReduxAction}
 */
export const validatedInWaitingList = (email) => ({
  type: VALIDATED_IN_WAITING_LIST,
  payload: email,
});

/**
 * Removes the
 * @param {number} noticeId
 * @returns {{payload: *, type: string}}
 */
export const removeAcceptanceNotice = (noticeId) => ({
  type: REMOVE_ACCEPTANCE_NOTICE,
  payload: noticeId,
});

/**
 * Removes the user from the Redux store.
 * @returns {ReduxAction}
 */
const logoutUser = () => ({
  type: LOGOUT_USER,
});

/**
 * Fetches the API for a given user credentials (username and password).
 * @param {User} user
 */
export const signinUserFetch = (user) => (dispatch) => {
  fetch("/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.hasOwnProperty("error")) {
        dispatch(signinUserFailure(data.error));
      } else {
        localStorage.setItem("access-token", data.accessToken);
        dispatch(signinUserSuccess(data.user));
      }
    })
    .catch((error) => error);
};

/**
 * Fetches the API for a given JWT access token in `localStorage`.
 */
export const getProfileFetch = () => (dispatch) => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    fetchAPI(
      "/auth/user",
      (data) => {
        if (data.hasOwnProperty("error")) {
          dispatch(signinUserFailure(data.error));
          localStorage.removeItem("access-token");
        } else {
          dispatch(signinUserSuccess(data.user));
        }
      },
      dispatch
    );
  }
  return Promise.resolve();
};

/**
 * Removes the JWT access token from the localStorage and dispatches the user logout action.
 */
export const logoutRemoveUser = () => (dispatch) => {
  localStorage.removeItem("access-token");
  dispatch(logoutUser());
};
