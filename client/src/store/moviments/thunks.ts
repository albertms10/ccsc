import { Moviment, ResponseError } from "common";
import { fetchAPI } from "../../helpers";
import { AppThunkAction } from "../types";
import {
  fetchMovimentsFailure,
  fetchMovimentsRequest,
  fetchMovimentsSuccess,
} from "./actions";

export const fetchMoviments = (): AppThunkAction => (dispatch) => {
  dispatch(fetchMovimentsRequest());

  fetchAPI(
    `/moviments`,
    (data: Moviment[] | ResponseError) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchMovimentsFailure((data as ResponseError).error));
      else dispatch(fetchMovimentsSuccess(data as Moviment[]));
    },
    dispatch
  );
};
