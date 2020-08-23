import { FetchError } from "common";
import { Projecte } from "model";

export const FETCH_PROJECTES_REQUEST = "FETCH_PROJECTES_REQUEST";
export const FETCH_PROJECTES_SUCCESS = "FETCH_PROJECTES_SUCCESS";
export const FETCH_PROJECTES_FAILURE = "FETCH_PROJECTES_FAILURE";

export interface ProjectesState {
  projectes: Projecte[];
  loading: boolean;
  fetched: boolean;
  error: Record<string, unknown> | FetchError;
}

interface FetchProjectesRequestAction {
  type: typeof FETCH_PROJECTES_REQUEST;
}

interface FetchProjectesSuccessAction {
  type: typeof FETCH_PROJECTES_SUCCESS;
  payload: Projecte[];
}

interface FetchProjectesFailureAction {
  type: typeof FETCH_PROJECTES_FAILURE;
  payload: FetchError;
}

export type ProjectesActionTypes =
  | FetchProjectesRequestAction
  | FetchProjectesSuccessAction
  | FetchProjectesFailureAction;
