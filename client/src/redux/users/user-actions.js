import { SAVE_USER, REMOVE_USER } from "./user-types";

/**
 * Saves the user information to the Redux store.
 *
 * @param user
 * @returns {{payload: object, type: string}}
 */
const saveUser = (user) => ({
  type: SAVE_USER,
  payload: user,
});

/**
 * Removes the user from the Redux store.
 *
 * @returns {{type: string}}
 */
const removeUser = () => ({
  type: REMOVE_USER,
});

/**
 * Fetches the API for a given user credentials (username and password).
 *
 * @param user
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
      if (data.hasOwnProperty("message")) {
        console.log(data);
      } else {
        localStorage.setItem("access-token", data.accessToken);
        dispatch(saveUser(data.user));
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

/**
 * Fetches the API for a given JWT access token.
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
        if (data.hasOwnProperty("message")) {
          localStorage.removeItem("access-token");
        } else {
          dispatch(saveUser(data.user));
        }
      });
  }
};

/**
 * Removes the JWT access token from the localStorage and dispatches the user logout action.
 *
 * @returns {function(...[*]=)}
 */
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("access-token");
  dispatch(removeUser());
};
