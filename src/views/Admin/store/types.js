import createTypes from "~/utils/createTypes";
import async from '~/utils/async';

export default createTypes('USER', [
  ...async('GET_USER'),
]);
