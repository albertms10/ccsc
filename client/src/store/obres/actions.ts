import { FetchError, Obra } from "common";
import {
  FETCH_OBRES_FAILURE,
  FETCH_OBRES_REQUEST,
  FETCH_OBRES_SUCCESS,
  ObresActionTypes,
} from "./types";

export const fetchObresRequest = (): ObresActionTypes => ({
  type: FETCH_OBRES_REQUEST,
});

export const fetchObresSuccess = (obres: Obra[]): ObresActionTypes => ({
  type: FETCH_OBRES_SUCCESS,
  payload: obres,
});

export const fetchObresFailure = (error: FetchError): ObresActionTypes => ({
  type: FETCH_OBRES_FAILURE,
  payload: error,
});
