import actions from './actions/index';
const initialState = {
  banks: null,
  categories: null,
  transactions: null,
  custTransaction: null,
};
let _transaction = null;
export default function BankState(state = initialState, action) {
  switch (action.type) {
    case actions.GET_BANK_SUCCESS:
      let _bank = null;
      action.response.data.forEach((bank) => {
        _bank = {
          ..._bank,
          [bank.id]: bank,
        };
      });
      return {
        ...state,
        banks: { ..._bank },
      };
    case actions.GET_CATEGORY_SUCCESS:
      let _category = null;
      action.response.data.forEach((category) => {
        _category = {
          ..._category,
          [category.code]: category,
        };
      });
      return {
        ...state,
        categories: _category ? { ..._category } : null,
      };

    case actions.GET_TRANSACTION_SUCCESS:
      _transaction = null;
      action.response.data.forEach((transaction) => {
        _transaction = {
          ..._transaction,
          [transaction.id]: transaction,
        };
      });
      return {
        ...state,
        transactions: _transaction ? { ..._transaction } : null,
      };
    case actions.GET_CUSTOMER_TRANSACTION_SUCCESS:
      _transaction = null;
      action.response.data.forEach((transaction) => {
        _transaction = {
          ..._transaction,
          [transaction.id]: transaction,
        };
      });
      return {
        ...state,
        custTransaction: _transaction ? { ..._transaction } : null,
      };
    default:
      return state;
  }
}
