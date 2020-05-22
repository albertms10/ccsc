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
  waitingList: { inWaitingList: false, email: "" },
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
        waitingList: { inWaitingList: true, email: "" },
      };

    case SIGNIN_USER_FAILURE:
      return {
        ...state,
        currentUser: {},
        error: action.payload,
      };

    case VALIDATED_IN_WAITING_LIST:
      return {
        ...state,
        waitingList: { inWaitingList: true, email: action.payload },
      };

    case LOGOUT_USER:
      return {
        currentUser: {},
        error: {},
        waitingList: {}
      };

    default:
      return state;
  }
};
