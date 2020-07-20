import {
  FETCH_PROJECTES_FAILURE,
  FETCH_PROJECTES_REQUEST,
  FETCH_PROJECTES_SUCCESS,
  ProjectesActionTypes,
  ProjectesState,
} from "./types";

const initialState: ProjectesState = {
  projectes: [],
  loading: false,
  fetched: false,
  error: {},
};

export default (
  state = initialState,
  action: ProjectesActionTypes
): ProjectesState => {
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
        projectes: action.payload,
        loading: false,
        fetched: true,
        error: {},
      };

    case FETCH_PROJECTES_FAILURE:
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
