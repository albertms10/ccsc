import { Obra, ResponseError } from "common";
import { fetchAPI } from "../../helpers";
import { AppThunk } from "../index";
import {
  fetchObresFailure,
  fetchObresRequest,
  fetchObresSuccess,
} from "./actions";

export const fetchObres = (): AppThunk => (dispatch) => {
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
