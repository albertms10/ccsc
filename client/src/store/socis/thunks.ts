import { ResponseError, Soci } from "common";
import { fetchAPI } from "../../helpers";
import { AppThunkAction } from "../types";
import {
  fetchSocisFailure,
  fetchSocisRequest,
  fetchSocisSuccess,
} from "./actions";

export const fetchSocis = (): AppThunkAction => (dispatch) => {
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
