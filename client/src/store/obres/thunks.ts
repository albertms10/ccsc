import { Obra, ResponseError } from "common";
import { fetchAPI } from "../../helpers";
import { AppThunkAction } from "../types";
import {
  fetchObresFailure,
  fetchObresRequest,
  fetchObresSuccess,
} from "./actions";

export const fetchObres = (): AppThunkAction => (dispatch) => {
  dispatch(fetchObresRequest());

  fetchAPI(
    `/obres`,
    (data: Obra[] | ResponseError) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchObresFailure((data as ResponseError).error));
      else dispatch(fetchObresSuccess(data as Obra[]));
    },
    dispatch
  );
};
