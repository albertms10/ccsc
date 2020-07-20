import {
  FETCH_OBRES_FAILURE,
  FETCH_OBRES_REQUEST,
  FETCH_OBRES_SUCCESS,
  ObresActionTypes,
  ObresState,
} from "./types";

const initialState: ObresState = {
  obres: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (state = initialState, action: ObresActionTypes): ObresState => {
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
        obres: action.payload,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_OBRES_FAILURE:
      return {
        ...state,
        loading: false,
        fetched: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
