import { ResponseError, Soci } from "common";
import { fetchAPI } from "../../helpers";
import { AppThunk } from "../index";
import {
  fetchSocisFailure,
  fetchSocisRequest,
  fetchSocisSuccess,
} from "./actions";

export const fetchSocis = (): AppThunk => (dispatch) => {
  dispatch(fetchSocisRequest());

  fetchAPI(
    `/socis`,
    (data: Soci[] | ResponseError) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchSocisFailure((data as ResponseError).error));
      else dispatch(fetchSocisSuccess(data as Soci[]));
    },
    dispatch
  );
};
