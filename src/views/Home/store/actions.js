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

export function getCart(userId) {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.GET_CART,
        payload: {
          request: {
            url: `/carts/${userId}`,
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

export function getCustomer(userId) {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.GET_CUSTOMER,
        payload: {
          request: {
            url: `/customers/${userId}`,
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

export function getItemById(itemId) {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.GET_ITEM,
        payload: {
          request: {
            url: `/items/${itemId}`,
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

export function getItemOrderedById(itemId) {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.GET_ITEM_ORDERED,
        payload: {
          request: {
            url: `/items-ordered/${itemId}`,
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

export function createCustomer() {
  return async (dispatch) => {
    try {
      const data = await dispatch({
        type: types.CREATE_CUSTOMER,
        payload: {
          request: {
            url: `/customers`,
            data: {
              name: '',
              phone: '',
            },
            method: 'POST',
          },
        },
      });
      console.log('payload', data);
    } catch(err) {
      console.log('err', err);
    }
  };
}

export function setExtras(extras) {
  return { type: types.SET_EXTRAS, payload: { data: extras } };
}

export function setItemOrderedExtras(extras) {
  return { type: types.SET_ITEM_ORDERED_EXTRAS, payload: { data: extras } };
}

export function setCart(items) {
  return { type: types.SET_CART, payload: { data: items } };
}
