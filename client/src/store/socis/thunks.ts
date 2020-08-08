import { message } from "antd";
import { ResponseError } from "common";
import { Soci } from "model";
import { baseFetchAPI } from "../../helpers/use-fetch-api";
import { AppThunkAction } from "../types";
import {
  fetchSocisFailure,
  fetchSocisRequest,
  fetchSocisSuccess,
} from "./actions";

export const fetchSocis = (): AppThunkAction => (dispatch) => {
  dispatch(fetchSocisRequest());

  baseFetchAPI<Soci[]>(
    `/socis`,
    (data) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchSocisFailure((data as ResponseError).error));
      else dispatch(fetchSocisSuccess(data as Soci[]));
    },
    (error) => message.error(error.message)
  );
};
