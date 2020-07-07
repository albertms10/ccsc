import { fetchAPI } from "../../helpers";
import {
  FETCH_MOVIMENTS_FAILURE,
  FETCH_MOVIMENTS_REQUEST,
  FETCH_MOVIMENTS_SUCCESS,
} from "./moviments-types";

const fetchMovimentsRequest = () => ({
  type: FETCH_MOVIMENTS_REQUEST,
});

const fetchMovimentsSuccess = (moviments) => ({
  type: FETCH_MOVIMENTS_SUCCESS,
  payload: { moviments },
});

const fetchMovimentsFailure = (error) => ({
  type: FETCH_MOVIMENTS_FAILURE,
  payload: { error },
});

export const fetchMoviments = () => (dispatch) => {
  dispatch(fetchMovimentsRequest());

  fetchAPI(
    `/moviments`,
    (data) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchMovimentsFailure(data.error));
      else dispatch(fetchMovimentsSuccess(data));
    },
    dispatch
  );
};
