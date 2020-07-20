import {
  AssajosActionTypes,
  AssajosState,
  FETCH_ASSAJOS_FAILURE,
  FETCH_ASSAJOS_REQUEST,
  FETCH_ASSAJOS_SUCCESS,
} from "./types";

const initialState: AssajosState = {
  assajos: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (
  state = initialState,
  action: AssajosActionTypes
): AssajosState => {
  switch (action.type) {
    case FETCH_ASSAJOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };

    case FETCH_ASSAJOS_SUCCESS:
      return {
        ...state,
        assajos: action.payload,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_ASSAJOS_FAILURE:
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
