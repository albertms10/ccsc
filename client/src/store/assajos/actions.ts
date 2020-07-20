import { Assaig, FetchError } from "common";
import {
  AssajosActionTypes,
  FETCH_ASSAJOS_FAILURE,
  FETCH_ASSAJOS_REQUEST,
  FETCH_ASSAJOS_SUCCESS,
} from "./types";

export const fetchAssajosRequest = (): AssajosActionTypes => ({
  type: FETCH_ASSAJOS_REQUEST,
});

export const fetchAssajosSuccess = (assajos: Assaig[]): AssajosActionTypes => ({
  type: FETCH_ASSAJOS_SUCCESS,
  payload: assajos,
});

export const fetchAssajosFailure = (error: FetchError): AssajosActionTypes => ({
  type: FETCH_ASSAJOS_FAILURE,
  payload: error,
});
