import { fetchAPI } from "../../helpers";
import {
  FETCH_SOCIS_FAILURE,
  FETCH_SOCIS_REQUEST,
  FETCH_SOCIS_SUCCESS,
} from "./socis-types";

const fetchSocisRequest = () => ({
  type: FETCH_SOCIS_REQUEST,
});

const fetchSocisSuccess = (socis) => ({
  type: FETCH_SOCIS_SUCCESS,
  payload: { socis },
});

const fetchSocisFailure = (error) => ({
  type: FETCH_SOCIS_FAILURE,
  payload: { error },
});

export const fetchSocis = () => (dispatch) => {
  dispatch(fetchSocisRequest());

  fetchAPI(
    `/socis`,
    (data) => {
      if (data.hasOwnProperty("error")) dispatch(fetchSocisFailure(data.error));
      else dispatch(fetchSocisSuccess(data));
    },
    dispatch
  );
};
