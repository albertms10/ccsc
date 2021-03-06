import { showErrorMessage } from "helpers";
import { baseFetchAPI } from "helpers/use-fetch-api";
import { Projecte } from "model";
import { AppThunkAction } from "../types";
import {
  fetchProjectesFailure,
  fetchProjectesRequest,
  fetchProjectesSuccess,
} from "./actions";

export const fetchProjectes = (): AppThunkAction => (dispatch, getState) => {
  const { id_persona } = getState().user.currentUser;

  dispatch(fetchProjectesRequest());

  baseFetchAPI<Projecte[]>(
    `/socis/${id_persona}/projectes`,
    (data) => {
      dispatch(fetchProjectesSuccess(data));
    },
    (error) => {
      dispatch(fetchProjectesFailure(error));
      showErrorMessage(error.status, error.message);
    }
  );
};
