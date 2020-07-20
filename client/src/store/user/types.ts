import { FetchError, Usuari } from "common";

export const SIGNIN_USER_SUCCESS = "SIGNIN_USER_SUCCESS";
export const SIGNIN_USER_FAILURE = "SIGNIN_USER_FAILURE";
export const VALIDATED_IN_WAITING_LIST = "VALIDATED_IN_WAITING_LIST";
export const REMOVE_ACCEPTANCE_NOTICE = "REMOVE_ACCEPTANCE_NOTICE";
export const LOGOUT_USER = "LOGOUT_USER";

export interface UserState {
  currentUser: Usuari | {};
  error: FetchError | {};
  waitingList: {
    inWaitingList?: boolean;
    email?: string;
  };
}

export interface SignInUser {
  username: string;
  password: string;
}

export interface UserResponse {
  user: Usuari;
  accessToken: string;
}

export interface SigninUserSuccessAction {
  type: typeof SIGNIN_USER_SUCCESS;
  payload: Usuari;
}

export interface SigninUserFailureAction {
  type: typeof SIGNIN_USER_FAILURE;
  payload: FetchError;
}

export interface ValidatedInWaitingListAction {
  type: typeof VALIDATED_IN_WAITING_LIST;
  payload: string;
}

export interface RemoveAcceptanceNoticeAction {
  type: typeof REMOVE_ACCEPTANCE_NOTICE;
  payload: number;
}

export interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}

export type UserActionTypes =
  | SigninUserSuccessAction
  | SigninUserFailureAction
  | ValidatedInWaitingListAction
  | RemoveAcceptanceNoticeAction
  | LogoutUserAction;
