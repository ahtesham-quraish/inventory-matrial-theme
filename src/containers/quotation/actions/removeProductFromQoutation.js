import { action_types } from './actionTypes';

export function removeProductFromQoutation(payload) {
  return (dispatch) => {
    dispatch({
      type: action_types.REMOVE_PRODUCT_FROM_QOUTATION,
      payload: payload,
    });
  };
}
