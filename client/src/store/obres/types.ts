import { FetchError, Obra } from "common";

export const FETCH_OBRES_REQUEST = "FETCH_OBRES_REQUEST";
export const FETCH_OBRES_SUCCESS = "FETCH_OBRES_SUCCESS";
export const FETCH_OBRES_FAILURE = "FETCH_OBRES_FAILURE";

export interface ObresState {
  obres: Obra[];
  loading: boolean;
  fetched: boolean;
  error: FetchError | {};
}

interface FetchObresRequestAction {
  type: typeof FETCH_OBRES_REQUEST;
}

interface FetchObresSuccessAction {
  type: typeof FETCH_OBRES_SUCCESS;
  payload: Obra[];
}

interface FetchObresFailureAction {
  type: typeof FETCH_OBRES_FAILURE;
  payload: FetchError;
}

export type ObresActionTypes =
  | FetchObresRequestAction
  | FetchObresSuccessAction
  | FetchObresFailureAction;
