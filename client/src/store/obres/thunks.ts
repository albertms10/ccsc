import { message } from "antd";
import { ResponseError } from "common";
import { baseFetchAPI } from "helpers/use-fetch-api";
import { Obra } from "model";
import { AppThunkAction } from "../types";
import {
  fetchObresFailure,
  fetchObresRequest,
  fetchObresSuccess,
} from "./actions";

export const fetchObres = (): AppThunkAction => (dispatch) => {
  dispatch(fetchObresRequest());

  baseFetchAPI<Obra[]>(
    `/obres`,
    (data) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchObresFailure((data as ResponseError).error));
      else dispatch(fetchObresSuccess(data as Obra[]));
    },
    (error) => message.error(error.message)
  );
};
