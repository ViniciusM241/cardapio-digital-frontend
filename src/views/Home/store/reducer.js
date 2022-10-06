import { handleActions, combineActions } from "redux-actions";
import types from './types';

const INITIAL_STATE = {
  isLoading: false,
  menu: [],
  cart: {
    total: '0.00',
    itemsOrdered: [],
  },
  customer: {
    id: 0,
    name: '',
    phone: '',
  },
  selectedItem: {
    id: 0,
    name: '',
    description: '',
    imageURL: null,
    value: '0.00',
    categoryId: null,
    extras: [],
  },
  selectedItemOrdered: {
    id: 0,
    notes: '',
    quantity: '',
    itemId: null,
    customerId: null,
    extras: [],
    item: {
      id: 0,
      name: '',
      description: '',
      imageURL: null,
      value: '0.00',
      categoryId: null,
    },
    total: '0.00',
  },
};

const beginLoading = combineActions(
  types.GET_MENU,
  types.GET_CART,
  types.GET_CUSTOMER,
  types.GET_ITEM,
  types.SET_EXTRAS,
  types.CREATE_CUSTOMER,
  types.SET_CART,
  types.GET_ITEM_ORDERED,
  types.SET_ITEM_ORDERED_EXTRAS,
);

const stopLoading = combineActions(
  types.GET_MENU_SUCCESS,
  types.GET_MENU_FAIL,
  types.GET_CART_SUCCESS,
  types.GET_CART_FAIL,
  types.GET_CUSTOMER_SUCCESS,
  types.GET_CUSTOMER_FAIL,
  types.GET_ITEM_SUCCESS,
  types.GET_ITEM_FAIL,
  types.CREATE_CUSTOMER_SUCCESS,
  types.CREATE_CUSTOMER_FAIL,
  types.GET_ITEM_ORDERED_SUCCESS,
  types.GET_ITEM_ORDERED_FAIL,
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
    [types.GET_CART_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      cart: data,
    }),
    [types.GET_CUSTOMER_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      customer: data,
    }),
    [types.GET_ITEM_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      selectedItem: data,
    }),
    [types.GET_ITEM_ORDERED_SUCCESS]: (state, { payload: { data } }) => ({
      ...state,
      selectedItemOrdered: data,
    }),
    [types.CREATE_CUSTOMER_SUCCESS]: (state, { payload: { data } }) => {
      if (data.status === 400)
        return state;

      return {
        ...state,
        customer: data,
      };
    },
    [types.SET_EXTRAS]: (state, { payload: { data } }) => ({
      ...state,
      selectedItem: {
        ...state.selectedItem,
        extras: data,
      },
    }),
    [types.SET_ITEM_ORDERED_EXTRAS]: (state, { payload: { data } }) => ({
      ...state,
      selectedItemOrdered: {
        ...state.selectedItemOrdered,
        extras: data,
      },
    }),
    [types.SET_CART]: (state, { payload: { data } }) => ({
      ...state,
      cart: data,
    }),
  },
  INITIAL_STATE
);

export default reducer;
