import { showErrorMessage } from "helpers";
import { baseFetchAPI } from "helpers/use-fetch-api";
import { Soci } from "model";
import { AppThunkAction } from "../types";
import {
  fetchSocisFailure,
  fetchSocisRequest,
  fetchSocisSuccess,
} from "./actions";

export const fetchSocis = (): AppThunkAction => (dispatch) => {
  dispatch(fetchSocisRequest());

  baseFetchAPI<Soci[]>(
    "/socis",
    (data) => {
      dispatch(fetchSocisSuccess(data));
    },
    (error) => {
      dispatch(fetchSocisFailure(error));
      showErrorMessage(error.status, error.message);
    }
  );
};
