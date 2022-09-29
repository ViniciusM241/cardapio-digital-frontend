import createTypes from "~/utils/createTypes";
import async from '~/utils/async';

export default createTypes('ADMIN', [
  ...async('GET_PROFILE'),
]);
