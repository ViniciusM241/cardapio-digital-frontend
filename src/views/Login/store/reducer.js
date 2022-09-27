import { handleActions, combineActions } from "redux-actions";
import types from "./types";

const INITIAL_STATE = {
  isLoading: false,
  user: {
    id: null,
    email: '',
    name: '',
    token: '',
  },
}

const beginLoading = combineActions(
  types.LOGIN,
  types.GET_USER_BY_TOKEN,
);

const stopLoading = combineActions(
  types.LOGIN_SUCCESS,
  types.LOGIN_FAIL,
  types.GET_USER_BY_TOKEN_SUCCESS,
  types.GET_USER_BY_TOKEN_FAIL,
);

const reducer = handleActions(
  {
    [beginLoading]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [stopLoading]: (state) => ({
      ...state,
      isLoading: false,
    }),
    [types.LOGIN_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      user: { ...state.user, token: data.token },
    }),
    [types.GET_USER_BY_TOKEN_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      user: data,
    }),
  },
  INITIAL_STATE
);

export default reducer;
