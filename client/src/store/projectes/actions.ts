import { FetchError, Projecte } from "common";
import {
  FETCH_PROJECTES_FAILURE,
  FETCH_PROJECTES_REQUEST,
  FETCH_PROJECTES_SUCCESS,
  ProjectesActionTypes,
} from "./types";

export const fetchProjectesRequest = (): ProjectesActionTypes => ({
  type: FETCH_PROJECTES_REQUEST,
});

export const fetchProjectesSuccess = (
  projectes: Projecte[]
): ProjectesActionTypes => ({
  type: FETCH_PROJECTES_SUCCESS,
  payload: projectes,
});

export const fetchProjectesFailure = (
  error: FetchError
): ProjectesActionTypes => ({
  type: FETCH_PROJECTES_FAILURE,
  payload: error,
});
