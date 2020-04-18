import { SIGNIN_USER, LOGOUT_USER } from "./user-types";

/**
 * Redux action for saving the user data in the app state.
 *
 * @param user
 * @returns {{payload: object, type: string}}
 */
const signinUser = (user) => ({
  type: SIGNIN_USER,
  payload: user,
});

/**
 * Redux action for logging a user out.
 *
 * @returns {{type: string}}
 */
const logoutUser = () => ({
  type: LOGOUT_USER,
});

/**
 * Async Redux Thunk that fetches the API for a given user credentials (username and password).
 *
 * @param user
 * @returns {function(function): Promise<any>}
 */
export const signinUserFetch = (user) => (dispatch) => {
  return fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...user }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.hasOwnProperty("message")) {
        localStorage.setItem("access-token", data.accessToken);
        dispatch(signinUser(data.user));
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logoutUserClean = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  dispatch(logoutUser());
};
