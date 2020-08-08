import { message } from "antd";
import { ResponseError } from "common";
import { Projecte, Usuari } from "model";
import { baseFetchAPI } from "../../helpers/use-fetch-api";
import { AppThunkAction } from "../types";
import {
  fetchProjectesFailure,
  fetchProjectesRequest,
  fetchProjectesSuccess,
} from "./actions";

export const fetchProjectes = (): AppThunkAction => (dispatch, getState) => {
  const { id_persona } = getState().user.currentUser as Usuari;

  dispatch(fetchProjectesRequest());

  baseFetchAPI<Projecte[]>(
    `/socis/${id_persona}/projectes`,
    (data) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchProjectesFailure((data as ResponseError).error));
      else dispatch(fetchProjectesSuccess(data as Projecte[]));
    },
    (error) => message.error(error.message)
  );
};
