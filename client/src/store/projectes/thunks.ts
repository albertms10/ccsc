import { ResponseError } from "common";
import { Projecte, Usuari } from "model";
import { fetchAPI } from "../../helpers";
import { AppThunkAction } from "../types";
import {
  fetchProjectesFailure,
  fetchProjectesRequest,
  fetchProjectesSuccess,
} from "./actions";

export const fetchProjectes = (): AppThunkAction => (dispatch, getState) => {
  const { id_persona } = getState().user.currentUser as Usuari;

  dispatch(fetchProjectesRequest());

  fetchAPI(
    `/socis/${id_persona}/projectes`,
    (data: Projecte[] | ResponseError) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchProjectesFailure((data as ResponseError).error));
      else dispatch(fetchProjectesSuccess(data as Projecte[]));
    },
    dispatch
  );
};
