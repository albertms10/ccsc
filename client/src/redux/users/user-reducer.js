import {
  LOGOUT_USER,
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_SUCCESS,
} from "./user-types";

/** @type {UserState} */
const initialState = {
  currentUser: {},
  error: {},
};

/**
 * @param {UserState} state
 * @param {ReduxAction} action
 * @returns {UserState}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER_SUCCESS:
      return {
        currentUser: action.payload,
        error: {},
      };

    case SIGNIN_USER_FAILURE:
      return {
        currentUser: {},
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        currentUser: {},
        error: {},
      };

    default:
      return state;
  }
};
