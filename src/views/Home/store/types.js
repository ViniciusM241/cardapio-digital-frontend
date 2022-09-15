import createTypes from "~/utils/createTypes";
import async from '~/utils/async';

export default createTypes('MENU', [
  ...async('GET_MENU'),
  ...async('GET_CART'),
  ...async('GET_CUSTOMER'),
  ...async('GET_ITEM'),
  ...async('GET_ITEM_ORDERED'),
  ...async('CREATE_CUSTOMER'),
  ...async('SET_ITEM_QUANTITY'),
  'SET_EXTRAS',
  'SET_ITEM_ORDERED_EXTRAS',
  'SET_CART',
]);
