import { message } from "antd";
import { baseFetchAPI } from "helpers/use-fetch-api";
import { Moviment } from "model";
import { AppThunkAction } from "../types";
import {
  fetchMovimentsFailure,
  fetchMovimentsRequest,
  fetchMovimentsSuccess,
} from "./actions";

export const fetchMoviments = (): AppThunkAction => (dispatch) => {
  dispatch(fetchMovimentsRequest());

  baseFetchAPI<Moviment[]>(
    "/moviments",
    (data) => {
      dispatch(fetchMovimentsSuccess(data));
    },
    (error) => {
      dispatch(fetchMovimentsFailure(error));
      message.error(error.message);
    }
  );
};
