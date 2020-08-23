import { FetchError } from "common";
import { Moviment } from "model";

export const FETCH_MOVIMENTS_REQUEST = "FETCH_MOVIMENTS_REQUEST";
export const FETCH_MOVIMENTS_SUCCESS = "FETCH_MOVIMENTS_SUCCESS";
export const FETCH_MOVIMENTS_FAILURE = "FETCH_MOVIMENTS_FAILURE";

export interface MovimentsState {
  moviments: Moviment[];
  loading: boolean;
  fetched: boolean;
  error: Record<string, unknown> | FetchError;
}

interface FetchMovimentsRequestAction {
  type: typeof FETCH_MOVIMENTS_REQUEST;
}

interface FetchMovimentsSuccessAction {
  type: typeof FETCH_MOVIMENTS_SUCCESS;
  payload: Moviment[];
}

interface FetchMovimentsFailureAction {
  type: typeof FETCH_MOVIMENTS_FAILURE;
  payload: FetchError;
}

export type MovimentsActionTypes =
  | FetchMovimentsRequestAction
  | FetchMovimentsSuccessAction
  | FetchMovimentsFailureAction;
