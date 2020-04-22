import {
  LOGOUT_USER,
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_SUCCESS,
} from "./user-types";

/**
 * Saves the user information to the Redux store.
 *
 * @param {User} user
 * @returns {{payload: User, type: string}}
 */
const signinUserSuccess = (user) => ({
  type: SIGNIN_USER_SUCCESS,
  payload: user,
});

/**
 * Sets the error to the Redux store.
 *
 * @param error
 * @returns {{payload: *, type: string}}
 */
const signinUserFailure = (error) => ({
  type: SIGNIN_USER_FAILURE,
  payload: error,
});

/**
 * Removes the user from the Redux store.
 *
 * @returns {{type: string}}
 */
const logoutUser = () => ({
  type: LOGOUT_USER,
});

/**
 * Fetches the API for a given user credentials (username and password).
 *
 * @param {User} user
 * @returns {function(function): Promise<any>}
 */
export const signinUserFetch = (user) => (dispatch) =>
  fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...user }),
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

/**
 * Fetches the API for a given JWT access token in `localStorage`.
 *
 * @returns {function(...[*]=)}
 */
export const getProfileFetch = () => (dispatch) => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    return fetch("/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // TODO He d'enviar una autorització per cada consulta que faci al backend?
        "x-access-token": accessToken,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.hasOwnProperty("error")) {
          dispatch(signinUserFailure(data.error));
          localStorage.removeItem("access-token");
        } else {
          dispatch(signinUserSuccess(data.user));
        }
      });
  }
  return Promise.resolve();
};

/**
 * Removes the JWT access token from the localStorage and dispatches the user logout action.
 *
 * @returns {function(...[*]=)}
 */
export const logoutRemoveUser = () => (dispatch) => {
  localStorage.removeItem("access-token");
  dispatch(logoutUser());
};
