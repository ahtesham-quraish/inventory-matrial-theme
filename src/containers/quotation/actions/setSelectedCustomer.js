import { action_types } from './actionTypes';
export function setSelectedCustomer(payload) {
  return (dispatch) => {
    dispatch({
      type: action_types.SET_SELECTED_CUSTOMER,
      payload: payload,
    });
  };
}
