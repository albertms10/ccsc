import {
  FETCH_SOCIS_FAILURE,
  FETCH_SOCIS_REQUEST,
  FETCH_SOCIS_SUCCESS,
} from "./socis-types";

const initialState = {
  socis: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOCIS_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };

    case FETCH_SOCIS_SUCCESS:
      return {
        ...state,
        socis: action.payload.socis,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_SOCIS_FAILURE:
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
