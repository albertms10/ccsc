import { message } from "antd";
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
    "/obres",
    (data) => {
      dispatch(fetchObresSuccess(data));
    },
    (error) => {
      dispatch(fetchObresFailure(error));
      message.error(error.message);
    }
  );
};
