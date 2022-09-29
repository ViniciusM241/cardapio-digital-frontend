import types from './types';

export function getProfile() {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.GET_PROFILE,
        payload: {
          request: {
            url: '/profile',
            method: 'GET',
          },
        },
      });

      console.log('payload', data);
    } catch(err) {
      console.log(err);
    }
  };
}
