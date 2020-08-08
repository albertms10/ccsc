import { message } from "antd";
import { ResponseError } from "common";
import { Assaig, Usuari } from "model";
import { baseFetchAPI } from "../../helpers/use-fetch-api";
import { AppThunkAction } from "../types";
import {
  fetchAssajosFailure,
  fetchAssajosRequest,
  fetchAssajosSuccess,
} from "./actions";

export const fetchAssajos = (): AppThunkAction => (dispatch, getState) => {
  const { id_persona } = getState().user.currentUser as Usuari;

  dispatch(fetchAssajosRequest());

  baseFetchAPI<Assaig[]>(
    `/socis/${id_persona}/assajos`,
    (data) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchAssajosFailure((data as ResponseError).error));
      else dispatch(fetchAssajosSuccess(data as Assaig[]));
    },
    (error) => message.error(error.message)
  );
};
