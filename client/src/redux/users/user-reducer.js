import {
  LOGOUT_USER,
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_SUCCESS,
} from "./user-types";

const initialState = {
  currentUser: {},
  error: {},
};

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
