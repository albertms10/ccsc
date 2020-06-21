import {
  FETCH_MOVIMENTS_FAILURE,
  FETCH_MOVIMENTS_REQUEST,
  FETCH_MOVIMENTS_SUCCESS,
} from "./moviments-types";

const initialState = {
  moviments: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };

    case FETCH_MOVIMENTS_SUCCESS:
      return {
        ...state,
        moviments: action.payload.moviments,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_MOVIMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        fetched: true,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
