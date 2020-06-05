import {
  FETCH_PROJECTES_FAILURE,
  FETCH_PROJECTES_REQUEST,
  FETCH_PROJECTES_SUCCESS,
} from "./projectes-types";

const initialState = {
  projectes: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTES_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };

    case FETCH_PROJECTES_SUCCESS:
      return {
        ...state,
        projectes: action.payload.projectes,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_PROJECTES_FAILURE:
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
