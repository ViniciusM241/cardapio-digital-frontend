import { handleActions, combineActions } from "redux-actions";
import types from './types';

const INITIAL_STATE = {
  isLoading: false,
  profile: {
    id: '',
    name: '',
    email: '',
  },
};

const beginLoading = combineActions(
  types.GET_PROFILE,
);

const stopLoading = combineActions(
  types.GET_PROFILE_SUCCESS,
  types.GET_PROFILE_FAIL,
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
    [types.GET_PROFILE_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      profile: data,
    }),
    [types.SET_PROFILE]: (state, { payload: { data } }) => ({
      ...state,
      profile: data,
    }),
  },
  INITIAL_STATE
);

export default reducer;
