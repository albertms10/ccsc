import { Moviment, ResponseError } from "common";
import { fetchAPI } from "../../helpers";
import { AppThunk } from "../index";
import {
  fetchMovimentsFailure,
  fetchMovimentsRequest,
  fetchMovimentsSuccess,
} from "./actions";

export const fetchMoviments = (): AppThunk => (dispatch) => {
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
