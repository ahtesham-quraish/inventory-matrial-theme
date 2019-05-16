import action_types from './actionTypes';
// import axios from 'axios';
import axiosInstance from '../../../helpers/axios-instance';

export function addProduct(payload) {
  console.log('action dispatched with payload ', payload);
  return (dispatch) => {
    axiosInstance.get('http://127.0.0.1:8000/product/').then((response) => {
      console.log('this is response', response);
      dispatch({
        type: action_types.ADD_FETCHED_PRODUCT,
        payload: response.data,
      });
    });
  };
}
