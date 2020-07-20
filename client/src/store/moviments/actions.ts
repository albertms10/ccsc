import { FetchError, Moviment } from "common";
import {
  FETCH_MOVIMENTS_FAILURE,
  FETCH_MOVIMENTS_REQUEST,
  FETCH_MOVIMENTS_SUCCESS,
  MovimentsActionTypes,
} from "./types";

export const fetchMovimentsRequest = (): MovimentsActionTypes => ({
  type: FETCH_MOVIMENTS_REQUEST,
});

export const fetchMovimentsSuccess = (
  moviments: Moviment[]
): MovimentsActionTypes => ({
  type: FETCH_MOVIMENTS_SUCCESS,
  payload: moviments,
});

export const fetchMovimentsFailure = (
  error: FetchError
): MovimentsActionTypes => ({
  type: FETCH_MOVIMENTS_FAILURE,
  payload: error,
});
