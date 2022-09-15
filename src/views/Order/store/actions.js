import types from "./types"

export function getMenu() {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.GET_MENU,
        payload: {
          request: {
            url: `/menu`,
            method: 'GET',
          },
        },
      });

      console.log('payload', data);
    } catch(err) {
      console.log('err', err);
    }
  };
}

export function setCart(items) {
  return { type: types.SET_CART, payload: { data: items } };
}
