import { fetchAPI } from "../../helpers";
import {
  FETCH_ASSAJOS_FAILURE,
  FETCH_ASSAJOS_REQUEST,
  FETCH_ASSAJOS_SUCCESS,
} from "./assajos-types";

const fetchAssajosRequest = () => ({
  type: FETCH_ASSAJOS_REQUEST,
});

const fetchAssajosSuccess = (assajos) => ({
  type: FETCH_ASSAJOS_SUCCESS,
  payload: { assajos },
});

const fetchAssajosFailure = (error) => ({
  type: FETCH_ASSAJOS_FAILURE,
  payload: { error },
});

export const fetchAssajos = () => (dispatch, getState) => {
  const { id_persona } = getState().user.currentUser;

  dispatch(fetchAssajosRequest());

  fetchAPI(
    `/socis/${id_persona}/assajos`,
    (data) => {
      if (data.hasOwnProperty("error")) dispatch(fetchAssajosFailure(data.error));
      else dispatch(fetchAssajosSuccess(data));
    },
    dispatch
  );
};
