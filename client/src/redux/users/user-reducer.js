import {
  LOGOUT_USER,
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_SUCCESS,
  VALIDATED_IN_WAITING_LIST,
} from "./user-types";

/** @type {UserState} */
const initialState = {
  currentUser: {},
  error: {},
  inWaitingList: false,
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
        inWaitingList: false,
      };

    case SIGNIN_USER_FAILURE:
      return {
        ...state,
        currentUser: {},
        error: action.payload,
      };

    case VALIDATED_IN_WAITING_LIST:
      return { ...state, inWaitingList: true };

    case LOGOUT_USER:
      return {
        ...state,
        currentUser: {},
        error: {},
      };

    default:
      return state;
  }
};
