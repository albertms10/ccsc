import { message } from "antd";
import { ResponseError } from "common";
import { Moviment } from "model";
import { baseFetchAPI } from "../../helpers/use-fetch-api";
import { AppThunkAction } from "../types";
import {
  fetchMovimentsFailure,
  fetchMovimentsRequest,
  fetchMovimentsSuccess,
} from "./actions";

export const fetchMoviments = (): AppThunkAction => (dispatch) => {
  dispatch(fetchMovimentsRequest());

  baseFetchAPI<Moviment[]>(
    `/moviments`,
    (data) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchMovimentsFailure((data as ResponseError).error));
      else dispatch(fetchMovimentsSuccess(data as Moviment[]));
    },
    (error) => message.error(error.message)
  );
};
