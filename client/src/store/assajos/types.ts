import { Assaig, FetchError } from "common";

export const FETCH_ASSAJOS_REQUEST = "FETCH_ASSAJOS_REQUEST";
export const FETCH_ASSAJOS_SUCCESS = "FETCH_ASSAJOS_SUCCESS";
export const FETCH_ASSAJOS_FAILURE = "FETCH_ASSAJOS_FAILURE";

export interface AssajosState {
  assajos: Assaig[];
  loading: boolean;
  fetched: boolean;
  error: FetchError | {};
}

interface FetchAssajosRequestAction {
  type: typeof FETCH_ASSAJOS_REQUEST;
}

interface FetchAssajosSuccessAction {
  type: typeof FETCH_ASSAJOS_SUCCESS;
  payload: Assaig[];
}

interface FetchAssajosFailureAction {
  type: typeof FETCH_ASSAJOS_FAILURE;
  payload: FetchError;
}

export type AssajosActionTypes =
  | FetchAssajosRequestAction
  | FetchAssajosSuccessAction
  | FetchAssajosFailureAction;
