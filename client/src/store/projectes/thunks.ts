import { message } from "antd";
import { baseFetchAPI } from "helpers/use-fetch-api";
import { Projecte, Usuari } from "model";
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
      dispatch(fetchProjectesSuccess(data));
    },
    (error) => {
      dispatch(fetchProjectesFailure(error));
      message.error(error.message);
    }
  );
};
