import { action_types } from './actionTypes';

export function addProductToQoutation(payload) {
  return (dispatch) => {
    dispatch({
      type: action_types.ADD_PRODUCT_TO_QOUTATION,
      payload: payload,
    });
  };
}
