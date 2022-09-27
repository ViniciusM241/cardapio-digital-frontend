import types from "./types";

export function login(body, cb) {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.LOGIN,
        payload: {
          request: {
            url: `/auth`,
            method: 'POST',
            data: body,
          },
        },
      });

      console.log('payload', data);
      return cb(null, data.payload);
    } catch(err) {
      console.log('error', err);
      cb(err);
    }
  }
}

export function getUserByToken(token) {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.GET_USER_BY_TOKEN,
        payload: {
          request: {
            url: `/users?token=${token}`,
            method: 'GET',
          },
        },
      });

      console.log('payload', data);
    } catch(err) {
      console.log('error', err);
    }
  }
}

export function setUser(user) {
  return { type: types.SET_USER, payload: user };
}
