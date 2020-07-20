import {
  FETCH_MOVIMENTS_FAILURE,
  FETCH_MOVIMENTS_REQUEST,
  FETCH_MOVIMENTS_SUCCESS,
  MovimentsActionTypes,
  MovimentsState,
} from "./types";

const initialState: MovimentsState = {
  moviments: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (
  state = initialState,
  action: MovimentsActionTypes
): MovimentsState => {
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
        moviments: action.payload,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_MOVIMENTS_FAILURE:
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
