import { FetchError } from "common";
import { Usuari } from "model";
import {
  LOGOUT_USER,
  REMOVE_ACCEPTANCE_NOTICE,
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_SUCCESS,
  UserActionTypes,
  VALIDATED_IN_WAITING_LIST,
} from "./types";

export const signinUserSuccess = (user: Usuari): UserActionTypes => ({
  type: SIGNIN_USER_SUCCESS,
  payload: user,
});

export const signinUserFailure = (error: FetchError): UserActionTypes => ({
  type: SIGNIN_USER_FAILURE,
  payload: error,
});

export const validatedInWaitingList = (email: string): UserActionTypes => ({
  type: VALIDATED_IN_WAITING_LIST,
  payload: email,
});

export const removeAcceptanceNotice = (noticeId: number): UserActionTypes => ({
  type: REMOVE_ACCEPTANCE_NOTICE,
  payload: noticeId,
});

export const logoutUser = (): UserActionTypes => ({
  type: LOGOUT_USER,
});
