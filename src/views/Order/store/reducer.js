import { handleActions, combineActions } from "redux-actions";
import types from './types';

const INITIAL_STATE = {
  isLoading: false,
};

const beginLoading = combineActions(
  types.GET_MENU,
);

const stopLoading = combineActions(
  types.GET_MENU_SUCCESS,
  types.GET_MENU_FAIL,
);

const reducer = handleActions(
  {
    [beginLoading]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [stopLoading]: (state) => ({
      ...state,
      isLoding: false,
    }),
    [types.GET_MENU_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      menu: data,
    }),
  },
  INITIAL_STATE
);

export default reducer;
