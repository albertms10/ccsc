import { FetchError } from "common";
import { Soci } from "model";

export const FETCH_SOCIS_REQUEST = "FETCH_SOCIS_REQUEST";
export const FETCH_SOCIS_SUCCESS = "FETCH_SOCIS_SUCCESS";
export const FETCH_SOCIS_FAILURE = "FETCH_SOCIS_FAILURE";

export interface SocisState {
  socis: Soci[];
  loading: boolean;
  fetched: boolean;
  error: {} | FetchError;
}

interface FetchSocisRequestAction {
  type: typeof FETCH_SOCIS_REQUEST;
}

interface FetchSocisSuccessAction {
  type: typeof FETCH_SOCIS_SUCCESS;
  payload: Soci[];
}

interface FetchSocisFailureAction {
  type: typeof FETCH_SOCIS_FAILURE;
  payload: FetchError;
}

export type SocisActionTypes =
  | FetchSocisRequestAction
  | FetchSocisSuccessAction
  | FetchSocisFailureAction;
