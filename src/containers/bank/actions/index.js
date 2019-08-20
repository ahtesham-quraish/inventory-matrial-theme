import axiosInstance from '../../../helpers/axios-instance';
const actions = {
  CRETAE_BANK_SUCCESS: 'CRETAE_BANK_SUCCESS',
  GET_BANK_SUCCESS: 'GET_BANK_SUCCESS',
  CRETAE_CATEGORY_SUCCESS: 'CRETAE_CATEGORY_SUCCESS',
  GET_CATEGORY_SUCCESS: 'GET_CATEGORY_SUCCESS',
  CRETAE_TRANSACTION_SUCCESS: 'CRETAE_TRANSACTION_SUCCESS',
  GET_TRANSACTION_SUCCESS: 'GET_TRANSACTION_SUCCESS',
  GET_CUSTOMER_TRANSACTION_SUCCESS: 'GET_CUSTOMER_TRANSACTION_SUCCESS',
  DELETE_TRANSACTION_SUCCESS: 'DELETE_TRANSACTION_SUCCESS',
  createBank: (payload) => {
    return (dispatch) => {
      return axiosInstance
        .post(`http://localhost:8000/bank/`, payload)
        .then((response) =>
          dispatch({
            type: actions.CRETAE_BANK_SUCCESS,
            response,
          }),
        );
    };
  },
  createCategory: (payload) => {
    return (dispatch) => {
      return axiosInstance
        .post(`http://localhost:8000/category/`, payload)
        .then((response) =>
          dispatch({
            type: actions.CRETAE_CATEGORY_SUCCESS,
            response,
          }),
        );
    };
  },
  createTransaction: (payload) => {
    return (dispatch) => {
      return axiosInstance
        .post(`http://localhost:8000/transaction/`, payload)
        .then((response) =>
          dispatch({
            type: actions.CRETAE_TRANSACTION_SUCCESS,
            response,
          }),
        );
    };
  },
  getBanks: () => {
    return (dispatch) => {
      return axiosInstance.get(`http://localhost:8000/bank/`).then((response) =>
        dispatch({
          type: actions.GET_BANK_SUCCESS,
          response,
        }),
      );
    };
  },
  getTransaction: () => {
    return (dispatch) => {
      return axiosInstance
        .get(`http://localhost:8000/transaction/`)
        .then((response) =>
          dispatch({
            type: actions.GET_TRANSACTION_SUCCESS,
            response,
          }),
        );
    };
  },
  getCustomerTransaction: (id) => {
    return (dispatch) => {
      return axiosInstance
        .get(`http://localhost:8000/transaction/cusomter/?cust_id=${id}`)
        .then((response) =>
          dispatch({
            type: actions.GET_CUSTOMER_TRANSACTION_SUCCESS,
            response,
          }),
        );
    };
  },
  deleteTransaction: (id) => {
    return (dispatch) => {
      return axiosInstance
        .delete(`http://localhost:8000/transaction/${id}/`)
        .then((response) =>
          dispatch({
            type: actions.DELETE_TRANSACTION_SUCCESS,
            response,
          }),
        );
    };
  },
  getCategory: () => {
    return (dispatch) => {
      return axiosInstance
        .get(`http://localhost:8000/category/`)
        .then((response) =>
          dispatch({
            type: actions.GET_CATEGORY_SUCCESS,
            response,
          }),
        );
    };
  },
};

export default actions;
