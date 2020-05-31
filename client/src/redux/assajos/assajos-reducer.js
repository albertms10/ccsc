import {
  FETCH_ASSAJOS_FAILURE,
  FETCH_ASSAJOS_REQUEST,
  FETCH_ASSAJOS_SUCCESS,
} from "./assajos-types";

const initialState = {
  assajos: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (state = initialState, action) => {
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
        assajos: action.payload.assajos,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_ASSAJOS_FAILURE:
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
