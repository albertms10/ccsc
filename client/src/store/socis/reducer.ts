import {
  FETCH_SOCIS_FAILURE,
  FETCH_SOCIS_REQUEST,
  FETCH_SOCIS_SUCCESS,
  SocisActionTypes,
  SocisState,
} from "./types";

const initialState: SocisState = {
  socis: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (state = initialState, action: SocisActionTypes): SocisState => {
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
        socis: action.payload,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_SOCIS_FAILURE:
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
