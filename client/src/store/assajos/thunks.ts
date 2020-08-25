import { message } from "antd";
import { baseFetchAPI } from "helpers/use-fetch-api";
import { Assaig, Usuari } from "model";
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
      dispatch(fetchAssajosSuccess(data));
    },
    (error) => {
      dispatch(fetchAssajosFailure(error));
      message.error(error.message);
    }
  );
};
