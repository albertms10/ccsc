import { FetchError } from "common";
import { Soci } from "model";
import {
  FETCH_SOCIS_FAILURE,
  FETCH_SOCIS_REQUEST,
  FETCH_SOCIS_SUCCESS,
  SocisActionTypes,
} from "./types";

export const fetchSocisRequest = (): SocisActionTypes => ({
  type: FETCH_SOCIS_REQUEST,
});

export const fetchSocisSuccess = (socis: Soci[]): SocisActionTypes => ({
  type: FETCH_SOCIS_SUCCESS,
  payload: socis,
});

export const fetchSocisFailure = (error: FetchError): SocisActionTypes => ({
  type: FETCH_SOCIS_FAILURE,
  payload: error,
});
