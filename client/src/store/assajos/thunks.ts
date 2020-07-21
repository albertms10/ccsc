import { ResponseError } from "common";
import { Assaig, Usuari } from "model";
import { fetchAPI } from "../../helpers";
import { AppThunkAction } from "../types";
import {
  fetchAssajosFailure,
  fetchAssajosRequest,
  fetchAssajosSuccess,
} from "./actions";

export const fetchAssajos = (): AppThunkAction => (dispatch, getState) => {
  const { id_persona } = getState().user.currentUser as Usuari;

  dispatch(fetchAssajosRequest());

  fetchAPI<Assaig[]>(
    `/socis/${id_persona}/assajos`,
    (data) => {
      if (data.hasOwnProperty("error"))
        dispatch(fetchAssajosFailure((data as ResponseError).error));
      else dispatch(fetchAssajosSuccess(data as Assaig[]));
    },
    dispatch
  );
};
