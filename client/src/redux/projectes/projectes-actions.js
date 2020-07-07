import { fetchAPI } from "../../helpers";
import {
  FETCH_PROJECTES_FAILURE,
  FETCH_PROJECTES_REQUEST,
  FETCH_PROJECTES_SUCCESS,
} from "./projectes-types";

const fetchProjectesRequest = () => ({
  type: FETCH_PROJECTES_REQUEST,
});

const fetchProjectesSuccess = (projectes) => ({
  type: FETCH_PROJECTES_SUCCESS,
  payload: { projectes },
});

const fetchProjectesFailure = (error) => ({
  type: FETCH_PROJECTES_FAILURE,
  payload: { error },
});

export const fetchProjectes = () => (dispatch, getState) => {
  const { id_persona } = getState().user.currentUser;

  dispatch(fetchProjectesRequest());

  fetchAPI(
    `/socis/${id_persona}/projectes`,
    (data) => {
      if (data.hasOwnProperty("error")) dispatch(fetchProjectesFailure(data.error));
      else dispatch(fetchProjectesSuccess(data));
    },
    dispatch
  );
};
