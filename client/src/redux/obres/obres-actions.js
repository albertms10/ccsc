import { fetchAPI } from "../../helpers";
import {
  FETCH_OBRES_FAILURE,
  FETCH_OBRES_REQUEST,
  FETCH_OBRES_SUCCESS,
} from "./obres-types";

const fetchObresRequest = () => ({
  type: FETCH_OBRES_REQUEST,
});

const fetchObresSuccess = (obres) => ({
  type: FETCH_OBRES_SUCCESS,
  payload: { obres },
});

const fetchObresFailure = (error) => ({
  type: FETCH_OBRES_FAILURE,
  payload: { error },
});

export const fetchObres = () => (dispatch) => {
  dispatch(fetchObresRequest());

  fetchAPI(
    `/api/obres`,
    (data) => {
      if (data.hasOwnProperty("error")) dispatch(fetchObresFailure(data.error));
      else dispatch(fetchObresSuccess(data));
    },
    dispatch
  );
};
