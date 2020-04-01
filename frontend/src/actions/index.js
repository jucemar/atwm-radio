import {
  MUSICA_FAILURE,
  MUSICA_REQUEST,
  MUSICA_SUCCESS,
  MUSICA_SCORE_FAILURE,
  MUSICA_SCORE_REQUEST,
  MUSICA_SCORE_SUCCESS,
  MUSICA_REFRESH_REQUEST,
  MUSICA_REFRESH_SUCCESS
} from "./actionTypes";

import { api } from "../services/api";

export const getMusicas = () => {
  return dispatch => {
    dispatch({ type: MUSICA_REQUEST });
    api
      .get("/musica")
      .then(res => {
        dispatch({ type: MUSICA_SUCCESS, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: MUSICA_FAILURE, payload: error });
      });
  };
};

export const alterarPosicao = item => {
  return dispatch => {
    dispatch({
      type: MUSICA_SCORE_REQUEST
    });

    console.log(`alterarPosicao item: ${item._id} score: ${item.score}`);
    api
      .put("/musica/score/" + item._id, item)
      .then(res => {
        dispatch({
          type: MUSICA_SCORE_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: MUSICA_SCORE_FAILURE,
          payload: error
        });
      });
  };
};

export const receberAlteracao = data => {
  return dispatch => {
    dispatch({
      type: MUSICA_REFRESH_REQUEST
    });

    setTimeout(() => {
      dispatch({
        type: MUSICA_REFRESH_SUCCESS,
        payload: data
      });
    }, 5000);
  };
};
