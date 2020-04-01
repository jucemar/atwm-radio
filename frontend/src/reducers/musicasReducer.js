import {
  MUSICA_FAILURE,
  MUSICA_REQUEST,
  MUSICA_SUCCESS,
  MUSICA_SCORE_FAILURE,
  MUSICA_SCORE_REQUEST,
  MUSICA_SCORE_SUCCESS,
  MUSICA_REFRESH_REQUEST,
  MUSICA_REFRESH_SUCCESS
} from "../actions/actionTypes";

const incialState = {
  registros: [],
  atualizando: false,
  item: {},
  carregando: false,
  error: false,
  msgError: ""
};

export const musicasReducer = (state = incialState, action) => {
  switch (action.type) {
    case MUSICA_REQUEST:
      return {
        ...state,
        carregando: true,
        registros: [],
        msgError: "",
        error: false
      };
    case MUSICA_SUCCESS:
      return {
        ...state,
        carregando: false,
        registros: ordenar(action.payload)
      };
    case MUSICA_FAILURE:
      return {
        ...state,
        carregando: false,
        error: true,
        msgError: action.payload
      };

    case MUSICA_SCORE_REQUEST:
      return {
        ...state,
        atualizando: true,
        msgError: "",
        error: false
      };

    case MUSICA_SCORE_SUCCESS:
      let novosRegistros = [
        ...state.registros.filter(regAtual => {
          return regAtual._id !== action.payload._id;
        }),
        action.payload
      ];

      return {
        ...state,
        atualizando: false,
        registros: ordenar(novosRegistros)
      };

    case MUSICA_SCORE_FAILURE:
      return {
        ...state,
        item: {},
        atualizando: false,
        error: true,
        msgError: action.payload
      };

    case MUSICA_REFRESH_REQUEST:
      return {
        ...state,
        atualizando: true
      };

    case MUSICA_REFRESH_SUCCESS:
      let refreshRegistros = [
        ...state.registros.filter(regAtual => {
          return regAtual._id !== action.payload._id;
        }),
        action.payload
      ];

      return {
        ...state,
        atualizando: false,
        registros: ordenar(refreshRegistros)
      };

    default:
      return { state };
  }
};

const ordenar = colDados => {
  return colDados.sort((item1, item2) => {
    return item2["score"] - item1["score"];
  });
};
