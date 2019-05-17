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

export function postProduct(payload) {
  return (dispatch) => {
    let options = { 'Content-Type': 'application/json' };
    console.log(payload, 'payload');
    dispatch({
      type: action_types.TOGGLE_PRODUCT_LOADER,
    });
    axiosInstance
      .post('http://127.0.0.1:8000/product/', payload, options)
      .then((response) => {
        dispatch({
          type: action_types.ADD_FETCHED_PRODUCT,
          payload: response.data,
        });
        dispatch({
          type: action_types.TOGGLE_PRODUCT_LOADER,
        });
        dispatch({
          type: action_types.APPEND_POSTED_PRODUCT_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: action_types.TOGGLE_PRODUCT_LOADER,
        });
        dispatch({
          type: action_types.APPEND_POSTED_PRODUCT_ERROR,
        });
      });
  };
}

export function togglePostSuccess() {
  console.log('success toggle func call');
  return (dispatch) => {
    dispatch({
      type: action_types.APPEND_POSTED_PRODUCT_SUCCESS,
    });
  };
}

export function togglePostError() {
  return (dispatch) => {
    dispatch({
      type: action_types.APPEND_POSTED_PRODUCT_ERROR,
    });
  };
}
