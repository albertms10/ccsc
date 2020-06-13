import {
  FETCH_OBRES_FAILURE,
  FETCH_OBRES_REQUEST,
  FETCH_OBRES_SUCCESS,
} from "./obres-types";

const initialState = {
  obres: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OBRES_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };

    case FETCH_OBRES_SUCCESS:
      return {
        ...state,
        obres: action.payload.obres,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_OBRES_FAILURE:
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
