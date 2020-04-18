import { LOGOUT_USER, SIGNIN_USER } from "./user-types";

const initialState = {
  currentUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: {},
      };

    default:
      return state;
  }
};
