import { REMOVE_USER, SAVE_USER } from "./user-types";

const initialState = {
  currentUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        currentUser: {},
      };

    default:
      return state;
  }
};
